import React from "react";
import Image from "next/image";
import MetaIcon from "@/app/icons/meta.svg";
import MicrosoftIcon from "@/app/icons/microsoft.svg";
import MistralIcon from "@/app/icons/mistral.svg";
import GoogleIcon from "@/app/icons/google.svg";
import StablelmIcon from "@/app/icons/stablelm.svg";
import DeepSeekIcon from "@/app/icons/deepseek.svg";
import { ModelRecord } from "../client/api";
import { ModelFamily } from "../constant";
import { Shirt, WandSparkles } from "lucide-react";

export function collectModelTable(
  models: readonly ModelRecord[],
  customModels: string,
) {
  const modelTable: Record<
    string,
    {
      name: string;
      display_name: string;
      provider?: ModelRecord["provider"]; // Marked as optional
      isDefault?: boolean;
    }
  > = {};

  // default models
  models.forEach((m) => {
    modelTable[m.name] = {
      ...m,
      display_name: m.name, // 'provider' is copied over if it exists
    };
  });

  // server custom models
  customModels
    .split(",")
    .filter((v) => !!v && v.length > 0)
    .forEach((m) => {
      const available = !m.startsWith("-");
      const nameConfig =
        m.startsWith("+") || m.startsWith("-") ? m.slice(1) : m;
      const [name, display_name] = nameConfig.split("=");

      modelTable[name] = {
        name,
        display_name: display_name || name,
        provider: modelTable[name]?.provider ?? "", // Use optional chaining
      };
    });

  return modelTable;
}

/**
 * Generate full model table.
 */
export function collectModels(
  models: readonly ModelRecord[],
  customModels: string,
) {
  const modelTable = collectModelTable(models, customModels);
  const allModels = Object.values(modelTable);

  return allModels;
}

export interface ModelDetails {
  family: ModelFamily;
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const QwenIcon = ({ className }: { className?: string }) => (
  <Image
    src="/qwen.webp"
    alt="Qwen Logo"
    width={20}
    height={20}
    className={className}
  />
);

const SmolLmIcon = ({ className }: { className?: string }) => (
  <Image
    src="/smollm.png"
    alt="SmolLM Logo"
    width={20}
    height={20}
    className={className}
  />
);

export const modelDetailsList: ModelDetails[] = [
  { family: ModelFamily.LLAMA, name: "Llama", icon: MetaIcon },
  { family: ModelFamily.DEEPSEEK, name: "DeepSeek", icon: DeepSeekIcon },
  {
    family: ModelFamily.QWEN,
    name: "Qwen",
    icon: QwenIcon,
  },
  { family: ModelFamily.GEMMA, name: "Gemma", icon: GoogleIcon },
  { family: ModelFamily.PHI, name: "Phi", icon: MicrosoftIcon },
  { family: ModelFamily.MISTRAL, name: "Mistral", icon: MistralIcon },
  {
    family: ModelFamily.SMOL_LM,
    name: "SmolLM",
    icon: SmolLmIcon,
  },
  { family: ModelFamily.STABLE_LM, name: "StableLM", icon: StablelmIcon },
  { family: ModelFamily.REDPAJAMA, name: "RedPajama", icon: Shirt },
  { family: ModelFamily.WIZARD_MATH, name: "Wizard Math", icon: WandSparkles },
];
