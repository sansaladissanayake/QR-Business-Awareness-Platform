export interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo: string;
  links: Link[];
  theme?: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    buttonColor: string;
    buttonTextColor: string;
  };
}

export const businesses: Record<string, Business> = {
  'console-items-lk': {
    id: 'console-items-lk',
    slug: 'console-items-lk',
    name: 'Console Items LK',
    description: 'Your one stop shop for gaming consoles, accessories and more in Sri Lanka.',
    logo: 'https://ui-avatars.com/api/?name=Console+Items+LK&background=101010&color=fff&size=200', // Placeholder logo
    links: [
      {
        id: 'maps',
        title: 'Find Us on Google Maps',
        url: 'https://maps.app.goo.gl/tiQGa2LszrMQVgdM8?g_st=ic',
        icon: 'MapPin',
      },
      {
        id: 'facebook',
        title: 'Facebook',
        url: 'https://www.facebook.com/ConsoleiTems.LK?mibextid=wwXIfr&mibextid=wwXIfr',
        icon: 'Facebook',
      },
      {
        id: 'whatsapp',
        title: 'WhatsApp',
        url: 'https://wa.me/94705269699', // Correctly formatted wa.me link
        icon: 'MessageCircle',
      },
      {
        id: 'call',
        title: 'Call Us',
        url: 'tel:+94705269699',
        icon: 'Phone',
      },
      {
        id: 'email',
        title: 'Email',
        url: 'mailto:consoleitemlk@gmail.com',
        icon: 'Mail',
      },
    ],
  },
};

export const getBusinessBySlug = (slug: string): Business | undefined => {
  return businesses[slug];
};
