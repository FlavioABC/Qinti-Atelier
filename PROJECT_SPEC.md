QINTI WEBSITE — MASTER DEVELOPMENT SPECIFICATION
Project Overview

You are developing the official website for QINTI, a Peruvian artistic gymnastics apparel brand with over 13 years of experience.

QINTI designs and manufactures artistic gymnastics leotards that are sold to gymnastics clubs, academies, and athletes in the United States and other countries.

The website is NOT an online store.

The website is a premium digital experience whose objective is to communicate craftsmanship, artistic creation, exclusivity, elegance, and quality.

Every design starts as a hand-painted sketch before becoming a finished leotard.

This philosophy must be reflected throughout the entire website.

The website must make visitors feel that they are entering an art studio rather than a clothing store.

The emotional message should always be:proc

"This is not just apparel. This is an artistic experience."

Technical Requirements

Build using only:

HTML5
CSS3
Vanilla JavaScript (ES6)

Do NOT use:

React
Vue
Angular
Bootstrap
Tailwind
jQuery
GSAP
Three.js
Any external framework

The website will be hosted on GitHub Pages.

Everything must work as a static website.

No backend.

No database.

No PHP.

No Node.js.

No build tools.

No package managers.

Everything must work by simply opening index.html.

General Design Philosophy

The website must feel:

Elegant

Artistic

Premium

Modern

Refined

Sophisticated

Warm

Organic

Handcrafted

It must NEVER feel:

Cheap

Corporate

Cold

Minimalistic to the point of emptiness

Childish

Overly feminine

Overly pink

Dark

Gaming inspired

Tech inspired

E-commerce inspired

Every page should feel like visiting an art gallery.

Design Inspiration

The interface should combine inspiration from:

Luxury fashion brands

Art galleries

Modern museums

Editorial magazines

Premium product presentations

Japanese minimalism

Handcrafted design studios

Natural paper textures

Watercolor illustrations

Brush painting

The overall feeling should be timeless.

Target Audience

Primary audience:

Gym owners

Gymnastics coaches

Parents

Professional athletes

Competitive gymnasts

Adults with different reading abilities

Therefore:

Large readable typography

Excellent contrast

Clear spacing

Large buttons

Large touch targets

Readable on phones

Never sacrifice usability for aesthetics.

Website Languages

English is the primary language.

Spanish is secondary.

The website must NOT have duplicated pages.

All text must come from JSON language files.

Example:

data/

english.json

spanish.json

The language switch must update the entire interface dynamically.

Website Structure

Home

About

Catalog

Contact

Home Page

The homepage should immediately communicate emotion.

Layout:

Left side:

A large rotating object.

One side:

A hummingbird.

The opposite side:

A gymnastics leotard.

Every rotation should reveal a different leotard.

Example:

Hummingbird

↓

Competition Leotard

↓

Hummingbird

↓

Training Leotard

↓

Hummingbird

↓

Another Leotard

Repeat forever.

The rotation must use CSS 3D transforms.

No GIFs.

No videos.

Smooth.

Elegant.

Organic.

Right side:

Three large buttons.

About

Catalog

Contact

Below them:

A small artistic sentence.

Example:

"Designed by hand.
Created for performance."

About Page

The About page should tell a story.

Sections:

Our Story

13 Years of Experience

From Sketch to Performance

Handcrafted Design Process

Made in Peru

Designed for the World

Large artistic photographs will be inserted later.

Do NOT generate images.

Only placeholders.

Catalog Page

This page is the heart of the website.

Products belong to two categories:

Training

Competition

At the top:

A category selector.

Below:

Only one product is displayed at a time.

The page scrolls vertically.

There will initially be six products per category.

When reaching the last product and scrolling down, the catalog loops seamlessly back to the first product.

The transition must feel natural.

Each Product Contains

Product Name

Short Description

Four predefined colors

Size selector

Customization button

WhatsApp Order button

Color Selector

Clicking a color changes the product image.

The image must NOT switch instantly.

Instead, replay the artistic brush reveal animation.

Size Selector

Sizes:

XS

S

M

L

XL

XXL

The selection only stores the chosen value.

It does not change the image.

Customization

Clicking "Customize My Design" expands a textarea.

Placeholder:

"Describe your ideas, colors, inspiration or special requests."

The user can write anything.

This text is later included inside the WhatsApp message.

WhatsApp Button

Clicking the button opens WhatsApp.

Automatically generate the message.

Example:

Hello QINTI!

I am interested in this design.

Category:
Competition

Model:
Aurora

Color:
Purple

Size:
M

Customization:
Long sleeves with silver rhinestones.

Thank you!

The message must be URL encoded.

Contact Page

Include:

WhatsApp

Email

Business Address

Business Hours

Social Media placeholders

Embedded map placeholder

Floating Buttons

Every page must permanently display two floating action buttons.

Bottom-right corner.

Top:

Email

Bottom:

WhatsApp

Spacing should be minimal.

Always visible.

Email:

Uses mailto:

WhatsApp:

Opens direct conversation.

Brush Reveal Animation (Very Important)

The brush reveal animation is one of the main brand identities.

Do NOT use:

GIF

Video

Canvas

Heavy libraries

Instead:

Use CSS masking or SVG masking combined with JavaScript.

Whenever a product image appears:

The image begins invisible.

Brush strokes progressively reveal the artwork.

The reveal must look like real paint strokes.

After completion:

The brush texture disappears.

Only the clean image remains.

Duration:

600–800 milliseconds.

The animation must replay:

When entering the catalog.

When changing products.

When changing colors.

When switching categories.

This animation must be reusable for every image.

Images

Never generate images.

Never use AI-generated placeholders.

Never download stock photos.

Only create empty placeholders with descriptive filenames.

Example:

images/

hummingbird-placeholder.webp

competition-01-placeholder.webp

training-03-placeholder.webp

The final images will be provided later.

Accessibility

WCAG AA

Keyboard navigation

Visible focus states

Minimum touch target 48x48 px

High contrast

Large fonts

Accessible labels

Responsive typography

Performance

Lazy loading

WebP support

Responsive images

Intersection Observer

No unnecessary JavaScript

No duplicated CSS

Optimized animations

Hardware accelerated transforms

Target Lighthouse score above 95.

Responsive Design

Desktop

Tablet

Mobile

Do NOT simply shrink elements.

Redesign layouts appropriately.

Desktop:

Two-column layout.

Mobile:

Single-column layout.

Images first.

Content second.

Buttons full width.

Code Quality

Use semantic HTML.

Use CSS custom properties.

Organize CSS into multiple files.

Write reusable JavaScript modules.

Avoid code duplication.

Comment important sections.

Use meaningful variable names.

Never hardcode repeated values.

Development Workflow (Critical)

DO NOT build the entire website in one step.

Follow this exact order:

✅ Phase 1 — Completed

Wait for approval.

✅ Phase 2 — Completed

Wait for approval.

✅ Phase 3 — Completed

Wait for approval.

✅ Phase 4 — Completed

Wait for approval.

✅ Phase 5 — Completed

Wait for approval.

✅ Phase 6 — Completed

Wait for approval.

✅ Phase 7 — Completed

Wait for approval.

✅ Phase 8 — Completed

Wait for approval.

✅ Phase 9 — Completed

Wait for approval.

✅ Phase 10 — Completed

Wait for approval.

✅ Phase 11 — Completed

Wait for approval.

✅ Phase 12 — Completed

Wait for approval.

✅ Phase 13 — Completed

Wait for approval.

Phase 14: Optimize animations, accessibility, responsiveness, and performance.

Wait for final approval before making any additional improvements.
