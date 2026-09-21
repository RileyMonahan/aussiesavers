export type ServiceKey = "electricity" | "gas" | "internet";

export interface PlanOffer {
  provider: string;
  planName: string;
  annualCost: number;
}

export interface BestDealOffer extends PlanOffer {
  minutesToSwitch: number;
  affiliateUrl: string;
}

export interface ServiceComparison {
  service: ServiceKey;
  label: string;
  icon: string;
  headline: string;
  contextItems: { label: string; value: string }[];
  current: PlanOffer;
  bestDeal: BestDealOffer;
}

/**
 * Placeholder comparison results for Stage 1/demo purposes.
 * In later stages this will be produced by the bill-analysis + provider
 * comparison pipeline instead of being hard-coded here. The affiliate URL
 * is a stand-in until real tracked referral links are connected.
 */
export const DEMO_COMPARISONS: Record<ServiceKey, ServiceComparison> = {
  electricity: {
    service: "electricity",
    label: "Electricity",
    icon: "⚡",
    headline: "A cheaper electricity plan is available for your household.",
    contextItems: [
      { label: "Current provider", value: "AGL" },
      { label: "Usage", value: "4,850 kWh/year" },
      { label: "Network", value: "CitiPower" },
    ],
    current: {
      provider: "AGL",
      planName: "AGL Value Saver",
      annualCost: 1980,
    },
    bestDeal: {
      provider: "GloBird",
      planName: "GloBird Market Offer",
      annualCost: 1645,
      minutesToSwitch: 10,
      affiliateUrl: "https://google.com",
    },
  },
  gas: {
    service: "gas",
    label: "Gas",
    icon: "🔥",
    headline: "A cheaper gas plan is available for your household.",
    contextItems: [
      { label: "Current provider", value: "Origin Energy" },
      { label: "Usage", value: "52 GJ/year" },
      { label: "Network", value: "Multinet Gas" },
    ],
    current: {
      provider: "Origin Energy",
      planName: "Origin Saver Gas",
      annualCost: 780,
    },
    bestDeal: {
      provider: "Tango Energy",
      planName: "Tango Gas Saver",
      annualCost: 650,
      minutesToSwitch: 10,
      affiliateUrl: "https://google.com",
    },
  },
  internet: {
    service: "internet",
    label: "Internet",
    icon: "📶",
    headline: "A faster, cheaper internet plan is available for your home.",
    contextItems: [
      { label: "Current provider", value: "Telstra" },
      { label: "Speed", value: "nbn50 (50/20 Mbps)" },
      { label: "Matched on", value: "Same or better speed" },
    ],
    current: {
      provider: "Telstra",
      planName: "Telstra nbn50",
      annualCost: 1188,
    },
    bestDeal: {
      provider: "Superloop",
      planName: "Superloop nbn50",
      annualCost: 948,
      minutesToSwitch: 15,
      affiliateUrl: "https://google.com",
    },
  },
};

export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  });
}
