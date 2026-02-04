import {
  ModalConfigValidator,
  ModelConfig,
  useAppConfig,
  ModelClient,
  Model,
} from "../store";

import CancelIcon from "../icons/cancel.svg";
import ConfirmIcon from "../icons/confirm.svg";

import Locale from "../locales";
import { InputRange } from "./input-range";
import { List, ListItem, Modal, Select, showToast } from "./ui-lib";
import React, { useState } from "react";
import { IconButton } from "./button";
import ModelSelect from "./model-select";

export function ModelConfigList() {
  const config = useAppConfig();
  const models = config.models;
  const [showModelSelector, setShowModelSelector] = useState(false);

  const updateModelConfig = (updater: (config: ModelConfig) => void) => {
    const modelConfig = { ...config.modelConfig } as ModelConfig;
    updater(modelConfig);
    config.update((config) => (config.modelConfig = modelConfig));
  };

  return (
    <>
      <ListItem title={Locale.Settings.Model}>
        <Select
          value={config.modelConfig.model}
          onClick={(e) => {
            e.preventDefault();
            setShowModelSelector(true);
          }}
          onMouseDown={(e) => {
            // Prevent the dropdown list from opening
            e.preventDefault();
          }}
          onChange={(e) => {
            updateModelConfig(
              (config) => (config.model = e.currentTarget.value),
            );
          }}
        >
          {models.map((v, i) => (
            <React.Fragment key={i}>
              <option value={v.name}>
                {v.name}
                {v.provider ? ` (${v.provider})` : ""}
              </option>
            </React.Fragment>
          ))}
        </Select>
      </ListItem>
      {showModelSelector && (
        <ModelSelect
          onClose={() => setShowModelSelector(false)}
          availableModels={models.map((m) => m.name)}
          onSelectModel={(model) => {
            updateModelConfig((config) => (config.model = model));
            setShowModelSelector(false);
          }}
        />
      )}

      {config.modelConfig.model.toLowerCase().startsWith("qwen3") && (
        <ListItem
          title={Locale.Settings.EnableThinking.Title}
          subTitle={Locale.Settings.EnableThinking.SubTitle}
        >
          <input
            type="checkbox"
            checked={config.enableThinking}
            onChange={(e) =>
              config.update(
                (config) => (config.enableThinking = e.currentTarget.checked),
              )
            }
          ></input>
        </ListItem>
      )}

      {/* New setting item for LLM model context window length */}
      <ListItem
        title={Locale.Settings.ContextWindowLength.Title}
        subTitle={Locale.Settings.ContextWindowLength.SubTitle}
      >
        <Select
          value={config.modelConfig.context_window_size}
          onChange={(e) => {
            updateModelConfig(
              (config) =>
                (config.context_window_size =
                  ModalConfigValidator.context_window_size(
                    parseInt(e.currentTarget.value),
                  )),
            );
          }}
        >
          <option value="1024">1K</option>
          <option value="2048">2K</option>
          <option value="4096">4K</option>
          <option value="8192">8K</option>
          <option value="16384">16K</option>
          <option value="32768">32K</option>
          <option value="65536">64K</option>
          <option value="131072">128K</option>
        </Select>
      </ListItem>

      <ListItem
        title={Locale.Settings.Temperature.Title}
        subTitle={Locale.Settings.Temperature.SubTitle}
      >
        <InputRange
          value={config.modelConfig.temperature?.toFixed(1)}
          min="0"
          max="1" // let's limit it to 0-1
          step="0.1"
          onChange={(e) => {
            updateModelConfig(
              (config) =>
                (config.temperature = ModalConfigValidator.temperature(
                  e.currentTarget.valueAsNumber,
                )),
            );
          }}
        ></InputRange>
      </ListItem>
      <ListItem
        title={Locale.Settings.TopP.Title}
        subTitle={Locale.Settings.TopP.SubTitle}
      >
        <InputRange
          value={(config.modelConfig.top_p ?? 1).toFixed(1)}
          min="0"
          max="1"
          step="0.1"
          onChange={(e) => {
            updateModelConfig(
              (config) =>
                (config.top_p = ModalConfigValidator.top_p(
                  e.currentTarget.valueAsNumber,
                )),
            );
          }}
        ></InputRange>
      </ListItem>
      <ListItem
        title={Locale.Settings.MaxTokens.Title}
        subTitle={Locale.Settings.MaxTokens.SubTitle}
      >
        <input
          type="number"
          min={1024}
          max={512000}
          value={config.modelConfig.max_tokens}
          onChange={(e) =>
            updateModelConfig(
              (config) =>
                (config.max_tokens = ModalConfigValidator.max_tokens(
                  e.currentTarget.valueAsNumber,
                )),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.PresencePenalty.Title}
        subTitle={Locale.Settings.PresencePenalty.SubTitle}
      >
        <InputRange
          value={config.modelConfig.presence_penalty?.toFixed(1)}
          min="-2"
          max="2"
          step="0.1"
          onChange={(e) => {
            updateModelConfig(
              (config) =>
                (config.presence_penalty =
                  ModalConfigValidator.presence_penalty(
                    e.currentTarget.valueAsNumber,
                  )),
            );
          }}
        ></InputRange>
      </ListItem>

      <ListItem
        title={Locale.Settings.FrequencyPenalty.Title}
        subTitle={Locale.Settings.FrequencyPenalty.SubTitle}
      >
        <InputRange
          value={config.modelConfig.frequency_penalty?.toFixed(1)}
          min="-2"
          max="2"
          step="0.1"
          onChange={(e) => {
            updateModelConfig(
              (config) =>
                (config.frequency_penalty =
                  ModalConfigValidator.frequency_penalty(
                    e.currentTarget.valueAsNumber,
                  )),
            );
          }}
        ></InputRange>
      </ListItem>
    </>
  );
}
