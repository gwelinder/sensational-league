import type { PortableTextBlock } from 'sanity';
import { toPlainText } from '@portabletext/react';

interface EmailTemplate {
	subject: string;
	preheader?: string;
	content: PortableTextBlock[];
	signature?: string;
	ctaButton?: {
		text?: string;
		url?: string;
	};
	socialLinks?: {
		youtube?: string;
		instagram?: string;
		facebook?: string;
		tiktok?: string;
		twitter?: string;
	};
}

interface EmailVariables {
	email: string;
	firstName?: string;
	[key: string]: string | undefined;
}

/**
 * Convert Portable Text to HTML email markup
 */
function portableTextToEmailHTML(blocks: PortableTextBlock[]): string {
	let html = '';

	for (const block of blocks) {
		if (block._type !== 'block') continue;

		const style = (block as any).style || 'normal';
		const children = (block as any).children || [];

		// Build text with marks
		let text = '';
		for (const child of children) {
			if (child._type === 'span') {
				let childText = child.text || '';
				const marks = child.marks || [];

				// Apply marks
				if (marks.includes('strong')) {
					childText = `<strong>${childText}</strong>`;
				}
				if (marks.includes('em')) {
					childText = `<em>${childText}</em>`;
				}

				// Handle links
				const linkMark = marks.find((m: any) => typeof m === 'object');
				if (linkMark) {
					const markDef = (block as any).markDefs?.find((def: any) => def._key === linkMark);
					if (markDef && markDef.href) {
						childText = `<a href="${markDef.href}" style="color: #232324; font-weight: 600; text-decoration: underline;">${childText}</a>`;
					}
				}

				text += childText;
			}
		}

		// Wrap in appropriate tag
		if (style === 'h2') {
			html += `<h2 style="margin: 30px 0 15px; color: #232324; font-size: 20px; font-weight: 700;">${text}</h2>`;
		} else if (style === 'normal') {
			// Check if it's a list item
			if ((block as any).listItem === 'bullet') {
				html += `<li style="margin-bottom: 8px; color: #232324; font-size: 16px; line-height: 1.6;">${text}</li>`;
			} else {
				html += `<p style="margin: 0 0 20px; color: #232324; font-size: 16px; line-height: 1.6;">${text}</p>`;
			}
		}
	}

	// Wrap list items in ul tags (simple approach)
	html = html.replace(/(<li[^>]*>.*?<\/li>\s*)+/g, (match) => {
		return `<ul style="margin: 0 0 20px; padding-left: 20px;">${match}</ul>`;
	});

	return html;
}

/**
 * Replace variables in text with actual values
 */
function replaceVariables(text: string, variables: EmailVariables): string {
	let result = text;
	for (const [key, value] of Object.entries(variables)) {
		if (value) {
			result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
		}
	}
	return result;
}

/**
 * Render email template to HTML
 */
export function renderEmailTemplate(template: EmailTemplate, variables: EmailVariables): { subject: string; html: string } {
	const subject = replaceVariables(template.subject, variables);
	const contentHTML = portableTextToEmailHTML(template.content);
	const signature = template.signature ? replaceVariables(template.signature, variables) : '';

	// Social links are now part of the content blocks, so we don't need to render them separately
	const socialLinksHTML = '';

	// Build signature HTML
	const signatureHTML = signature ? `
		<p style="margin: 0 0 10px; color: #232324; font-size: 16px; line-height: 1.6;">
			${signature.replace(/\n/g, '<br>')}
		</p>
		<p style="margin: 0 0 30px; color: #232324; font-size: 14px; line-height: 1.6; font-style: italic;">
			Sensational League - Fast. Rebellious. Female.
		</p>
	` : '';

	// Build CTA button HTML
	const ctaButtonHTML = template.ctaButton?.text && template.ctaButton?.url ? `
		<table role="presentation" style="margin: 0 auto;">
			<tr>
				<td style="border-radius: 24px; background-color: #D4FF00;">
					<a href="${template.ctaButton.url}" style="display: inline-block; padding: 14px 32px; color: #232324; text-decoration: none; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
						${template.ctaButton.text}
					</a>
				</td>
			</tr>
		</table>
	` : '';

	const html = `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F7F7F7;">
	<table role="presentation" style="width: 100%; border-collapse: collapse;">
		<tr>
			<td align="center" style="padding: 40px 20px;">
				<table role="presentation" style="max-width: 600px; width: 100%; background-color: #232324; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
					<!-- Header -->
					<tr>
						<td style="padding: 40px 40px 30px; text-align: center; background-color: #232324;">
							<h1 style="margin: 0; color: #D4FF00; font-size: 32px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">SENSATIONAL LEAGUE</h1>
							<p style="margin: 10px 0 0; color: #F7F7F7; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">Fast. Rebellious. Female.</p>
						</td>
					</tr>

					<!-- Content -->
					<tr>
						<td style="padding: 40px; background-color: #F7F7F7;">
							${contentHTML}
							${socialLinksHTML}
							${signatureHTML}
							${ctaButtonHTML}
						</td>
					</tr>

					<!-- Footer -->
					<tr>
						<td style="padding: 30px 40px; background-color: #232324; border-top: 2px solid #D4FF00;">
							<p style="margin: 0 0 15px; color: rgba(247,247,247,0.7); font-size: 12px; line-height: 1.5;">
								You're receiving this email because you subscribed to Sensational League newsletter.
							</p>
							<p style="margin: 0; color: rgba(247,247,247,0.7); font-size: 12px; line-height: 1.5;">
								<a href="mailto:hello@sensationalleague.com?subject=Unsubscribe" style="color: #D4FF00; text-decoration: underline;">Unsubscribe</a> |
								<a href="https://sensationalleague.com/privacy" style="color: #D4FF00; text-decoration: underline;">Privacy Policy</a>
							</p>
							<p style="margin: 15px 0 0; color: rgba(247,247,247,0.7); font-size: 12px; line-height: 1.5;">
								© ${new Date().getFullYear()} Sensational League. All rights reserved.
							</p>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>
	`;

	return { subject, html };
}
