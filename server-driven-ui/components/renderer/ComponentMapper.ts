import {
  ActionButton,
  AboutSection,
  Button,
  Card,
  ClubCard,
  CourseList,
  DepartmentCard,
  Divider,
  EventCalendar,
  ExamSchedule,
  FacilityCard,
  FeedbackForm,
  Footer,
  Breadcrumb,
  Pagination,
  Gallery,
  Container,
  ContactForm,
  DynamicSection,
  FAQAccordion,
  FacultyGrid,
  FacultyProfile,
  AdmissionForm,
  AnnouncementBanner,
  Grid,
  GridSection,
  Heading,
  HeroBanner,
  HeroCTAButton,
  HeroHeading,
  HeroSubheading,
  Image,
  InquiryForm,
  Badge,
  AlertBanner,
  Modal,
  Navbar,
  Paragraph,
  PlacementStats,
  ProgressTracker,
  Quote,
  RawHTML,
  Section,
  ScholarshipCard,
  Sidebar,
  Spacer,
  Stack,
  Statistics,
  StudentTestimonial,
  Tabs,
  Testimonial,
  TextBlock,
  Timeline,
  Tooltip,
  Video,
} from "../builder-components";
// Import shape components directly to ensure consistent references
import { Rectangle } from "../builder-components/Rectangle";
import { Circle } from "../builder-components/Circle";
import { Triangle } from "../builder-components/Triangle";
import { Ellipse } from "../builder-components/Ellipse";
import { Line } from "../builder-components/Line";

type GenericComponentProps = Record<string, unknown>;

// Ensure all components have required craft metadata
const ensureComponentMetadata = (
  component: React.ComponentType<GenericComponentProps>,
  displayName: string,
): React.ComponentType<GenericComponentProps> => {
  if (!component.craft) {
    (component as any).craft = {
      displayName,
      props: {},
    };
  }
  return component;
};

export const ComponentMapper: Record<
  string,
  React.ComponentType<GenericComponentProps>
> = {
  HeroBanner: ensureComponentMetadata(HeroBanner, "Hero Banner"),
  HeroHeading: ensureComponentMetadata(HeroHeading, "Hero Heading"),
  HeroSubheading: ensureComponentMetadata(HeroSubheading, "Hero Subheading"),
  HeroCTAButton: ensureComponentMetadata(HeroCTAButton, "Hero CTA Button"),
  TextBlock: ensureComponentMetadata(TextBlock, "Text Block"),
  Container: ensureComponentMetadata(Container, "Container"),
  Section: ensureComponentMetadata(Section, "Section"),
  Grid: ensureComponentMetadata(Grid, "Grid"),
  GridSection: ensureComponentMetadata(GridSection, "Grid Section"),
  Image: ensureComponentMetadata(Image, "Image"),
  Video: ensureComponentMetadata(Video, "Video"),
  AboutSection: ensureComponentMetadata(AboutSection, "About Section"),
  Statistics: ensureComponentMetadata(Statistics, "Statistics"),
  FacultyGrid: ensureComponentMetadata(FacultyGrid, "Faculty Grid"),
  FAQAccordion: ensureComponentMetadata(FAQAccordion, "FAQ Accordion"),
  ContactForm: ensureComponentMetadata(ContactForm, "Contact Form"),
  DynamicSection: ensureComponentMetadata(DynamicSection, "Dynamic Section"),
  Button: ensureComponentMetadata(Button, "Button"),
  ActionButton: ensureComponentMetadata(ActionButton, "Action Button"),
  RawHTML: ensureComponentMetadata(RawHTML, "Custom HTML"),
  Card: ensureComponentMetadata(Card, "Card"),
  ClubCard: ensureComponentMetadata(ClubCard, "Club Card"),
  CourseList: ensureComponentMetadata(CourseList, "Course List"),
  DepartmentCard: ensureComponentMetadata(DepartmentCard, "Department Card"),
  Divider: ensureComponentMetadata(Divider, "Divider"),
  EventCalendar: ensureComponentMetadata(EventCalendar, "Event Calendar"),
  ExamSchedule: ensureComponentMetadata(ExamSchedule, "Exam Schedule"),
  FacilityCard: ensureComponentMetadata(FacilityCard, "Facility Card"),
  FeedbackForm: ensureComponentMetadata(FeedbackForm, "Feedback Form"),
  Footer: ensureComponentMetadata(Footer, "Footer"),
  Breadcrumb: ensureComponentMetadata(Breadcrumb, "Breadcrumb"),
  Pagination: ensureComponentMetadata(Pagination, "Pagination"),
  Gallery: ensureComponentMetadata(Gallery, "Gallery"),
  Heading: ensureComponentMetadata(Heading, "Heading"),
  Paragraph: ensureComponentMetadata(Paragraph, "Paragraph"),
  Spacer: ensureComponentMetadata(Spacer, "Spacer"),
  FacultyProfile: ensureComponentMetadata(FacultyProfile, "Faculty Profile"),
  AdmissionForm: ensureComponentMetadata(AdmissionForm, "Admission Form"),
  AnnouncementBanner: ensureComponentMetadata(
    AnnouncementBanner,
    "Announcement Banner",
  ),
  InquiryForm: ensureComponentMetadata(InquiryForm, "Inquiry Form"),
  Badge: ensureComponentMetadata(Badge, "Badge"),
  AlertBanner: ensureComponentMetadata(AlertBanner, "Alert Banner"),
  Modal: ensureComponentMetadata(Modal, "Modal"),
  Navbar: ensureComponentMetadata(Navbar, "Navbar"),
  PlacementStats: ensureComponentMetadata(PlacementStats, "Placement Stats"),
  ProgressTracker: ensureComponentMetadata(ProgressTracker, "Progress Tracker"),
  Quote: ensureComponentMetadata(Quote, "Quote"),
  ScholarshipCard: ensureComponentMetadata(ScholarshipCard, "Scholarship Card"),
  Sidebar: ensureComponentMetadata(Sidebar, "Sidebar"),
  Stack: ensureComponentMetadata(Stack, "Stack"),
  StudentTestimonial: ensureComponentMetadata(
    StudentTestimonial,
    "Student Testimonial",
  ),
  Tabs: ensureComponentMetadata(Tabs, "Tabs"),
  Testimonial: ensureComponentMetadata(Testimonial, "Testimonial"),
  Timeline: ensureComponentMetadata(Timeline, "Timeline"),
  Tooltip: ensureComponentMetadata(Tooltip, "Tooltip"),
  Rectangle: ensureComponentMetadata(Rectangle, "Rectangle"),
  Circle: ensureComponentMetadata(Circle, "Circle"),
  Triangle: ensureComponentMetadata(Triangle, "Triangle"),
  Ellipse: ensureComponentMetadata(Ellipse, "Ellipse"),
  Line: ensureComponentMetadata(Line, "Line"),
};

// Debug log in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const shapeComponents = [
    "Rectangle",
    "Circle",
    "Triangle",
    "Ellipse",
    "Line",
  ];
  const missingShapes = shapeComponents.filter(
    (name) => !ComponentMapper[name],
  );
  if (missingShapes.length > 0) {
    console.warn("Missing shape components in ComponentMapper:", missingShapes);
  } else {
    console.log("✓ All shape components registered in ComponentMapper");
  }
}
