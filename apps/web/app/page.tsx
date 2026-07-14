import type { Metadata } from "next";
import { IGoalApp } from "./igoal-app";

export const metadata: Metadata = {
  title: "Manager Home · iGoal",
  description: "Không gian điều hành hiệu suất dành cho Manager và BOD.",
};

export default function Home() {
  return <IGoalApp />;
}

