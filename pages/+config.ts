import type { Config } from "vike/types";
import vikeReact from "vike-react/config";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/head-tags
  title: "Fitness Companion",

  description: "Fitness Companion is your ultimate workout tracker and fitness planner.",
  extends: [vikeReact],

  prerender: true,
} satisfies Config;
