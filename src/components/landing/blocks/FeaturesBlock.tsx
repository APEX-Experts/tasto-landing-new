import {
  Zap,
  Shield,
  Rocket,
  Star,
  Heart,
  Settings,
  Check,
  Users,
  Globe,
  Code,
  BarChart,
  Layers,
  Layout,
  MessageSquare,
  MousePointer,
  Phone,
  Search,
  Send,
  Share,
  ShoppingCart,
  Smile,
  Target,
  ThumbsUp,
  TrendingUp,
  Video,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Features as FeaturesType } from "@/payload-types";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  shield: Shield,
  rocket: Rocket,
  star: Star,
  heart: Heart,
  settings: Settings,
  check: Check,
  users: Users,
  globe: Globe,
  code: Code,
  "bar-chart": BarChart,
  layers: Layers,
  layout: Layout,
  "message-square": MessageSquare,
  "mouse-pointer": MousePointer,
  phone: Phone,
  search: Search,
  send: Send,
  share: Share,
  "shopping-cart": ShoppingCart,
  smile: Smile,
  target: Target,
  "thumbs-up": ThumbsUp,
  "trending-up": TrendingUp,
  video: Video,
};

/**
 * Features section that renders a grid of feature cards.
 * Each card includes an icon, title, and description.
 *
 * @param props - The Features component props, matching the Payload Features block type.
 */
export const FeaturesBlock: React.FC<FeaturesType> = ({ features }) => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon || "zap"] || Zap;

            return (
              <Card
                key={feature.id || index}
                className="relative overflow-hidden transition-all duration-300 group"
              >
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
