import loadFeatures from "@/src/framer/load-features";
import { LazyMotion, m } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";

const AnimatedChevron = ({
  filterTabs,
  activeFilter,
}: {
  filterTabs: string[];
  activeFilter: string;
}) => (
  <LazyMotion strict features={loadFeatures}>
    <m.div
      animate={{
        rotate: filterTabs.includes(activeFilter) ? 0 : "90deg",
      }}
    >
      <IoChevronDown size={22} />
    </m.div>
  </LazyMotion>
);

export default AnimatedChevron;
