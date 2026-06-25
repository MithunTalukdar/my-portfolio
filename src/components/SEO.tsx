import { profile } from "../constants/portfolio";

export function SEO() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url: "https://mithun-talukdar.dev",
    sameAs: [profile.github, profile.linkedin],
    email: profile.email,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
