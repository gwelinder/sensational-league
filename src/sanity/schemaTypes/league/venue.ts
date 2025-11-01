import { defineField, defineType } from "sanity";

export const venue = defineType({
  name: "venue",
  title: "Venue",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Venue Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Venue Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        defineField({
          name: "street",
          title: "Street Address",
          type: "string",
        }),
        defineField({
          name: "city",
          title: "City",
          type: "string",
        }),
        defineField({
          name: "state",
          title: "State/Province",
          type: "string",
        }),
        defineField({
          name: "postalCode",
          title: "Postal Code",
          type: "string",
        }),
        defineField({
          name: "country",
          title: "Country",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "location",
      title: "GPS Coordinates",
      type: "object",
      fields: [
        defineField({
          name: "latitude",
          title: "Latitude",
          type: "number",
        }),
        defineField({
          name: "longitude",
          title: "Longitude",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "capacity",
      title: "Stadium Capacity",
      type: "number",
    }),
    defineField({
      name: "fieldType",
      title: "Field Type",
      type: "string",
      options: {
        list: [
          { title: "Natural Grass", value: "natural" },
          { title: "Artificial Turf", value: "artificial" },
          { title: "Hybrid", value: "hybrid" },
        ],
      },
    }),
    defineField({
      name: "fieldDimensions",
      title: "Field Dimensions",
      type: "object",
      fields: [
        defineField({
          name: "length",
          title: "Length (meters)",
          type: "number",
        }),
        defineField({
          name: "width",
          title: "Width (meters)",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "facilities",
      title: "Facilities",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Changing Rooms", value: "changing_rooms" },
          { title: "Parking", value: "parking" },
          { title: "Concessions", value: "concessions" },
          { title: "Restrooms", value: "restrooms" },
          { title: "First Aid", value: "first_aid" },
          { title: "Media Center", value: "media_center" },
          { title: "VIP Area", value: "vip_area" },
          { title: "Accessibility Features", value: "accessibility" },
          { title: "Floodlights", value: "floodlights" },
          { title: "Sound System", value: "sound_system" },
          { title: "WiFi", value: "wifi" },
          { title: "Live Streaming Setup", value: "streaming" },
        ],
      },
    }),
    defineField({
      name: "contact",
      title: "Contact Information",
      type: "object",
      fields: [
        defineField({
          name: "phone",
          title: "Phone Number",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "email",
        }),
        defineField({
          name: "website",
          title: "Website",
          type: "url",
        }),
        defineField({
          name: "contactPerson",
          title: "Contact Person",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "accessibility",
      title: "Accessibility Information",
      type: "object",
      fields: [
        defineField({
          name: "wheelchairAccessible",
          title: "Wheelchair Accessible",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "accessibleParking",
          title: "Accessible Parking Available",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "accessibleRestrooms",
          title: "Accessible Restrooms",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "accessibilityNotes",
          title: "Additional Accessibility Notes",
          type: "text",
        }),
      ],
    }),
    defineField({
      name: "transportation",
      title: "Transportation Options",
      type: "object",
      fields: [
        defineField({
          name: "publicTransport",
          title: "Public Transport Access",
          type: "text",
          description: "Describe nearby public transport options",
        }),
        defineField({
          name: "parkingSpaces",
          title: "Number of Parking Spaces",
          type: "number",
        }),
        defineField({
          name: "parkingCost",
          title: "Parking Cost",
          type: "string",
        }),
        defineField({
          name: "bikeRacks",
          title: "Bike Racks Available",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: "sustainability",
      title: "Sustainability Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Solar Panels", value: "solar" },
          { title: "Rainwater Harvesting", value: "rainwater" },
          { title: "Recycling Program", value: "recycling" },
          { title: "Electric Vehicle Charging", value: "ev_charging" },
          { title: "LED Lighting", value: "led_lighting" },
          { title: "Water Conservation", value: "water_conservation" },
          { title: "Waste Reduction", value: "waste_reduction" },
          { title: "Green Building Certification", value: "green_certified" },
        ],
      },
    }),
    defineField({
      name: "safetyFeatures",
      title: "Safety & Security Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "CCTV Surveillance", value: "cctv" },
          { title: "Security Personnel", value: "security" },
          { title: "Emergency Exits", value: "emergency_exits" },
          { title: "First Aid Station", value: "first_aid_station" },
          { title: "Fire Safety Equipment", value: "fire_safety" },
          { title: "Emergency Communication System", value: "emergency_comms" },
          { title: "Crowd Control Barriers", value: "crowd_control" },
        ],
      },
    }),
    defineField({
      name: "bookingInfo",
      title: "Booking Information",
      type: "object",
      fields: [
        defineField({
          name: "hourlyRate",
          title: "Hourly Rate",
          type: "number",
        }),
        defineField({
          name: "currency",
          title: "Currency",
          type: "string",
          initialValue: "USD",
        }),
        defineField({
          name: "minimumBooking",
          title: "Minimum Booking Hours",
          type: "number",
        }),
        defineField({
          name: "advanceBooking",
          title: "Advance Booking Required (days)",
          type: "number",
        }),
        defineField({
          name: "availability",
          title: "General Availability",
          type: "text",
          description: "Describe typical availability hours and restrictions",
        }),
      ],
    }),
    defineField({
      name: "socialMediaInfo",
      title: "Social Media & Marketing",
      type: "object",
      fields: [
        defineField({
          name: "instagramHandle",
          title: "Instagram Handle",
          type: "string",
          description: "Without @",
        }),
        defineField({
          name: "facebookPage",
          title: "Facebook Page",
          type: "url",
        }),
        defineField({
          name: "twitterHandle",
          title: "Twitter Handle",
          type: "string",
          description: "Without @",
        }),
        defineField({
          name: "marketingPermissions",
          title: "Marketing Permissions",
          type: "array",
          of: [{ type: "string" }],
          options: {
            list: [
              { title: "Photography Allowed", value: "photography" },
              { title: "Video Recording Allowed", value: "video" },
              { title: "Live Streaming Allowed", value: "streaming" },
              { title: "Social Media Posting Allowed", value: "social_media" },
              { title: "Commercial Use Allowed", value: "commercial" },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "historicalSignificance",
      title: "Historical Significance",
      type: "blockContent",
      description: "Any historical or cultural significance of the venue",
    }),
    defineField({
      name: "description",
      title: "Venue Description",
      type: "blockContent",
    }),
    defineField({
      name: "operatingHours",
      title: "Operating Hours",
      type: "object",
      fields: [
        defineField({
          name: "monday",
          title: "Monday",
          type: "string",
          placeholder: "e.g., 9:00 AM - 10:00 PM",
        }),
        defineField({
          name: "tuesday",
          title: "Tuesday",
          type: "string",
        }),
        defineField({
          name: "wednesday",
          title: "Wednesday",
          type: "string",
        }),
        defineField({
          name: "thursday",
          title: "Thursday",
          type: "string",
        }),
        defineField({
          name: "friday",
          title: "Friday",
          type: "string",
        }),
        defineField({
          name: "saturday",
          title: "Saturday",
          type: "string",
        }),
        defineField({
          name: "sunday",
          title: "Sunday",
          type: "string",
        }),
        defineField({
          name: "holidays",
          title: "Holiday Hours",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "weatherConsiderations",
      title: "Weather Considerations",
      type: "object",
      fields: [
        defineField({
          name: "covered",
          title: "Covered/Indoor",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "weatherProtection",
          title: "Weather Protection Features",
          type: "array",
          of: [{ type: "string" }],
          options: {
            list: [
              { title: "Covered Stands", value: "covered_stands" },
              { title: "Drainage System", value: "drainage" },
              { title: "Wind Barriers", value: "wind_barriers" },
              { title: "Heating", value: "heating" },
              { title: "Air Conditioning", value: "air_conditioning" },
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "address.city",
      media: "images.0",
      capacity: "capacity",
    },
    prepare(selection) {
      const { title, subtitle, media, capacity } = selection;
      return {
        title: title,
        subtitle: `${subtitle || "Unknown City"} • Capacity: ${capacity || "N/A"}`,
        media: media,
      };
    },
  },
});