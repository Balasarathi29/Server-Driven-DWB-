import { HeroBanner } from "../builder-components/HeroBanner";
import { TextBlock } from "../builder-components/TextBlock";
import { Container } from "../builder-components/Container";
import { AboutSection } from "../builder-components/AboutSection";
import { Statistics } from "../builder-components/Statistics";
import { FacultyGrid } from "../builder-components/FacultyGrid";
import { FAQAccordion } from "../builder-components/FAQAccordion";
import { ContactForm } from "../builder-components/ContactForm";
import { DynamicSection } from "../builder-components/DynamicSection";
import { Button } from "../builder-components/Button";
import { ActionButton } from "../builder-components/ActionButton";
import { RawHTML } from "../builder-components/RawHTML";

type GenericComponentProps = Record<string, unknown>;

export const ComponentMapper: Record<
  string,
  React.ComponentType<GenericComponentProps>
> = {
  HeroBanner,
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
