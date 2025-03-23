declare module '@postlight/mercury-parser' {
  interface MercuryResult {
    title: string;
    content: string;
    author: string | null;
    excerpt: string | null;
    date_published: string | null;
  }

  const Mercury: {
    parse(url: string): Promise<MercuryResult>;
  };
  export default Mercury;
} 