import {
  ActionButton,
  AboutSection,
  Button,
  Container,
  ContactForm,
  DynamicSection,
  FAQAccordion,
  FacultyGrid,
  HeroBanner,
  HeroCTAButton,
  HeroHeading,
  HeroSubheading,
  RawHTML,
  Statistics,
  TextBlock,
} from "../builder-components";

type GenericComponentProps = Record<string, unknown>;

export const ComponentMapper: Record<
  string,
  React.ComponentType<GenericComponentProps>
> = {
  HeroBanner,
  HeroHeading,
  HeroSubheading,
  HeroCTAButton,
  TextBlock,
  Container,
  AboutSection,
  Statistics,
  FacultyGrid,
  FAQAccordion,
  ContactForm,
  DynamicSection,
  Button,
  ActionButton,
  RawHTML,
};
