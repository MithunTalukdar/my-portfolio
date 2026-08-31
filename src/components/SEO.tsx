import { useEffect } from "react";
import { profile } from "../constants/portfolio";

export function SEO() {
  const canonicalUrl = "https://mithun-talukdar.dev/";

  // Update dynamic document title and meta for SPA router consistency
  useEffect(() => {
    document.title = "Mithun Talukdar | Full Stack Developer & AI Developer";
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://mithun-talukdar.dev/#person",
        "name": "Mithun Talukdar",
        "givenName": "Mithun",
        "familyName": "Talukdar",
        "url": canonicalUrl,
        "image": "https://mithun-talukdar.dev/assets/profile-image.jpg",
        "jobTitle": "Full Stack Developer",
        "description":
          "Mithun Talukdar is an AI-Powered Full Stack Developer specializing in MERN Stack (React, Node.js, Express, MongoDB), Next.js, TypeScript, REST APIs, and scalable web architectures.",
        "email": `mailto:${profile.email}`,
        "telephone": profile.phone,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kolkata",
          "addressRegion": "West Bengal",
          "addressCountry": "India"
        },
        "sameAs": [
          profile.github,
          profile.linkedin
        ],
        "knowsAbout": [
          "Full Stack Web Development",
          "MERN Stack Development",
          "React.js",
          "Next.js",
          "JavaScript ES6+",
          "TypeScript",
          "Node.js",
          "Express.js",
          "MongoDB",
          "RESTful APIs",
          "Tailwind CSS",
          "Artificial Intelligence Web Integration",
          "Web Performance Optimization"
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Undergraduate Academic Program in Computer Science"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://mithun-talukdar.dev/#website",
        "url": canonicalUrl,
        "name": "Mithun Talukdar",
        "alternateName": "Mithun Talukdar Portfolio",
        "description":
          "Official personal portfolio website of Mithun Talukdar, Full Stack Developer.",
        "inLanguage": "en-US",
        "publisher": {
          "@id": "https://mithun-talukdar.dev/#person"
        },
        "author": {
          "@id": "https://mithun-talukdar.dev/#person"
        }
      },
      {
        "@type": "ProfilePage",
        "@id": "https://mithun-talukdar.dev/#webpage",
        "url": canonicalUrl,
        "name": "Mithun Talukdar | Full Stack Developer & AI Developer",
        "isPartOf": {
          "@id": "https://mithun-talukdar.dev/#website"
        },
        "about": {
          "@id": "https://mithun-talukdar.dev/#person"
        },
        "mainEntity": {
          "@id": "https://mithun-talukdar.dev/#person"
        },
        "description":
          "Official portfolio website of Mithun Talukdar showcasing full-stack MERN projects, REST API services, modern interactive UI/UX, and technical expertise.",
        "inLanguage": "en-US"
      },
      {
        "@type": "ItemList",
        "@id": "https://mithun-talukdar.dev/#projects",
        "name": "Featured Software Engineering Projects by Mithun Talukdar",
        "itemListElement": [
          {
            "@type": "SoftwareSourceCode",
            "position": 1,
            "name": "LMS (Learning Management System)",
            "description": "Full-stack Learning Management System with role-based dashboard, course progress, and secure auth.",
            "codeRepository": "https://github.com/MithunTalukdar/LMS",
            "programmingLanguage": "JavaScript, React, Node.js, Express, MongoDB",
            "author": { "@id": "https://mithun-talukdar.dev/#person" }
          },
          {
            "@type": "SoftwareSourceCode",
            "position": 2,
            "name": "Lumina Shopping",
            "description": "High-performance full-stack e-commerce web platform with product filters, cart management, and checkout.",
            "codeRepository": "https://github.com/MithunTalukdar/lumina-shoping",
            "programmingLanguage": "React, Tailwind CSS, Node.js, MongoDB",
            "author": { "@id": "https://mithun-talukdar.dev/#person" }
          },
          {
            "@type": "SoftwareSourceCode",
            "position": 3,
            "name": "Swastik International",
            "description": "Modern business web application with interactive product catalogs, responsive layout, and lead forms.",
            "codeRepository": "https://github.com/MithunTalukdar/Swastik-International",
            "programmingLanguage": "React, Tailwind CSS, JavaScript",
            "author": { "@id": "https://mithun-talukdar.dev/#person" }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

