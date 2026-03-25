import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const de: PartialLocaleType = {
  WIP: "In Bearbeitung...",
  ChatItem: {
    ChatItemCount: (count: number) => `${count} Nachrichten`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} Nachrichten mit ChatGPT`,
    Actions: {
      ChatList: "Zur Chat-Liste gehen",
      CompressedHistory: "Komprimierter Gedächtnis-Prompt",
      Export: "Alle Nachrichten als Markdown exportieren",
      Copy: "Kopieren",
      Stop: "Stop",
      Retry: "Wiederholen",
      Delete: "Delete",
    },
    Rename: "Chat umbenennen",
    Typing: "Tippen...",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} um zu Senden`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", Umschalt + Eingabe für Zeilenumbruch";
      }
      return inputHints + ", / zum Durchsuchen von Prompts";
    },
    Send: "Senden",
    Config: {
      Reset: "Reset to Default",
    },
  },
  Export: {
    Title: "Alle Nachrichten",
    Copy: "Alles kopieren",
    Download: "Herunterladen",
    MessageFromYou: "Deine Nachricht",
    MessageFromWebLLM: "Nachricht von WebLLM",
  },
  Memory: {
    Title: "Gedächtnis-Prompt",
    EmptyContent: "Noch nichts.",
    Send: "Gedächtnis senden",
    Copy: "Gedächtnis kopieren",
    Reset: "Sitzung zurücksetzen",
    ResetConfirm:
      "Das Zurücksetzen löscht den aktuellen Gesprächsverlauf und das Langzeit-Gedächtnis. Möchten Sie wirklich zurücksetzen?",
  },
  Home: {
    NewChat: "Neuer Chat",
    DeleteChat: "Bestätigen Sie, um das ausgewählte Gespräch zu löschen?",
    DeleteToast: "Chat gelöscht",
    Revert: "Zurücksetzen",
  },
  Settings: {
    Title: "Einstellungen",
    SubTitle: "Alle Einstellungen",

    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "Alle Sprachen",
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Schriftgröße",
      SubTitle: "Schriftgröße des Chat-Inhalts anpassen",
    },
    InjectSystemPrompts: {
      Title: "System-Prompts einfügen",
      SubTitle:
        "Erzwingt das Hinzufügen eines simulierten systemweiten Prompts von ChatGPT am Anfang der Nachrichtenliste bei jeder Anfrage",
    },
    Update: {
      Version: (x: string) => `Version: ${x}`,
      IsLatest: "Neueste Version",
      CheckUpdate: "Update prüfen",
      IsChecking: "Update wird geprüft...",
      FoundUpdate: (x: string) => `Neue Version gefunden: ${x}`,
      GoToUpdate: "Aktualisieren",
    },
    SendKey: "Senden-Taste",
    Theme: "Erscheinungsbild",
    TightBorder: "Enger Rahmen",
    SendPreviewBubble: {
      Title: "Vorschau-Bubble senden",
      SubTitle: "Preview markdown in bubble",
    },
    Prompt: {
      Disable: {
        Title: "Autovervollständigung deaktivieren",
        SubTitle: "Autovervollständigung mit / starten",
      },
      List: "Prompt-Liste",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} integriert, ${custom} benutzerdefiniert`,
      Edit: "Bearbeiten",
      Modal: {
        Title: "Prompt List",
        Add: "Add One",
        Search: "Search Prompts",
      },
      EditModal: {
        Title: "Edit Prompt",
      },
    },
    HistoryCount: {
      Title: "Anzahl der angehängten Nachrichten",
      SubTitle: "Anzahl der pro Anfrage angehängten gesendeten Nachrichten",
    },
    CompressThreshold: {
      Title: "Schwellenwert für Verlaufskomprimierung",
      SubTitle:
        "Komprimierung, wenn die Länge der unkomprimierten Nachrichten den Wert überschreitet",
    },

    Usage: {
      Title: "Kontostand",
      SubTitle(used: any, total: any) {
        return `Diesen Monat ausgegeben $${used}, Abonnement $${total}`;
      },
      IsChecking: "Wird überprüft...",
      Check: "Erneut prüfen",
      NoAccess: "API-Schlüssel eingeben, um den Kontostand zu überprüfen",
    },
    Model: "Modell",
    Temperature: {
      Title: "Temperature", //Temperatur
      SubTitle: "Ein größerer Wert führt zu zufälligeren Antworten",
    },
    MaxTokens: {
      Title: "Max Tokens", //Maximale Token
      SubTitle: "Maximale Anzahl der Anfrage- plus Antwort-Token",
    },
    PresencePenalty: {
      Title: "Presence Penalty", //Anwesenheitsstrafe
      SubTitle:
        "Ein größerer Wert erhöht die Wahrscheinlichkeit, dass über neue Themen gesprochen wird",
    },
    FrequencyPenalty: {
      Title: "Frequency Penalty", // HäufigkeitStrafe
      SubTitle:
        "Ein größerer Wert, der die Wahrscheinlichkeit verringert, dass dieselbe Zeile wiederholt wird",
    },
  },
  Store: {
    DefaultTopic: "Neues Gespräch",
    BotHello: "Hallo! Wie kann ich Ihnen heute helfen?",
    Error:
      "Etwas ist schief gelaufen, bitte versuchen Sie es später noch einmal.",
    Prompt: {
      History: (content: string) =>
        "Dies ist eine Zusammenfassung des Chatverlaufs zwischen dem KI und dem Benutzer als Rückblick: " +
        content,
      Topic:
        "Bitte erstellen Sie einen vier- bis fünfwörtigen Titel, der unser Gespräch zusammenfasst, ohne Einleitung, Zeichensetzung, Anführungszeichen, Punkte, Symbole oder zusätzlichen Text. Entfernen Sie Anführungszeichen.",
      Summarize:
        "Fassen Sie unsere Diskussion kurz in 200 Wörtern oder weniger zusammen, um sie als Pronpt für zukünftige Gespräche zu verwenden.",
    },
  },
  Copy: {
    Success: "In die Zwischenablage kopiert",
    Failed:
      "Kopieren fehlgeschlagen, bitte geben Sie die Berechtigung zum Zugriff auf die Zwischenablage frei",
  },
  Context: {
    Toast: (x: any) => `Mit ${x} Kontext-Prompts`,
    Edit: "Kontext- und Gedächtnis-Prompts",
    Add: "Hinzufügen",
  },
  Plugin: {
    Name: "Plugin",
  },
  FineTuned: {
    Sysmessage: "Du bist ein Assistent, der",
  },
  NewChat: {
    Return: "Zurückkehren",
    Skip: "Fang einfach an",
    Title: "Wählen Sie eine Vorlage",
    SubTitle: "Starten Sie den Chat mit einer Vorlage",
    More: "Finde mehr",
    NotShow: "Nie wieder zeigen",
    ConfirmNoShow:
      "Zum Deaktivieren bestätigen? Sie können es später in den Einstellungen aktivieren.",
  },

  UI: {
    Confirm: "Confirm",
    Cancel: "Cancel",
    Close: "Close",
    Create: "Create",
    Edit: "Edit",
  },
  Exporter: {
    Model: "Modell",
    Messages: "Nachrichten",
    Topic: "Thema",
    Time: "Zeit",
  },
};

de.Title = "Edu Chat";
de.Subtitle = "KI-Modelle im Browser";

de.Chat = {
  ...de.Chat,
  SubTitle: (count: number) => `${count} Nachrichten mit Edu Chat`,
  EditMessage: {
    Title: "Alle Nachrichten bearbeiten",
    Topic: {
      Title: "Thema",
      SubTitle: "Aktuelles Thema aendern",
    },
  },
  Actions: {
    ...de.Chat?.Actions,
    Play: "Abspielen",
    Share: "Teilen",
    Transcribing: "Transkribieren...",
    TranscribingFailed: "Transkription fehlgeschlagen",
    MicrophoneDenied: "Mikrofonzugriff verweigert",
    DownloadingModel: "Whisper-Modell wird heruntergeladen...",
    Processing: "Verarbeitung...",
    LoadingModel: "Modell wird geladen...",
    Edit: "Bearbeiten",
    EditConversation: "Konversation bearbeiten",
  },
  Commands: {
    new: "Neuen Chat starten",
    newt: "Neuen Chat mit Vorlage starten",
    next: "Naechster Chat",
    prev: "Vorheriger Chat",
    clear: "Kontext leeren",
    del: "Chat loeschen",
  },
  Roles: {
    System: "System-Prompt",
    Assistant: "Assistent",
    User: "Benutzer",
  },
  InputActions: {
    Stop: "Stopp",
    ToBottom: "Zum letzten",
    Theme: {
      auto: "Automatisch",
      light: "Helles Thema",
      dark: "Dunkles Thema",
    },
    QuickPrompt: "Schnell-Prompts",
    Clear: "Kontext leeren",
    Settings: "Einstellungen",
    UploadImage: "Bilder hochladen",
  },
  Config: {
    ...de.Chat?.Config,
    Reset: "Auf Standard zuruecksetzen",
    SaveAs: "Prompts speichern",
    Confirm: "Bestaetigen",
  },
  IsContext: "System-Prompt",
  Metrics: {
    Prefill: "Prefill",
    Decode: "Decode",
    TokensPerSec: "tok/s",
  },
};

de.Export = {
  ...de.Export,
  MessageFromWebLLM: "Nachricht von Edu Chat",
  Share: "Teilen",
  Format: {
    Title: "Exportformat",
    SubTitle: "Markdown oder PNG-Bild",
  },
  IncludeContext: {
    Title: "Kontext einbeziehen",
    SubTitle: "Kontext-Prompts der Vorlage exportieren oder nicht",
  },
  Steps: {
    Select: "Auswaehlen",
    Preview: "Vorschau",
  },
  Image: {
    Toast: "Bild wird erfasst...",
    Modal: "Lange druecken oder rechtsklicken, um das Bild zu speichern",
  },
};

de.Select = {
  Search: "Suchen",
  All: "Alles auswaehlen",
  Latest: "Neueste auswaehlen",
  Clear: "Leeren",
};

de.Settings = {
  ...de.Settings,
  Danger: {
    Reset: {
      Title: "Alle Einstellungen zuruecksetzen",
      SubTitle: "Alle Einstellungen auf Standardwerte setzen",
      Action: "Zuruecksetzen",
      Confirm: "Alle Einstellungen wirklich auf Standardwerte zuruecksetzen?",
    },
    Clear: {
      Title: "Alle Daten loeschen",
      SubTitle: "Alle Nachrichten und Einstellungen loeschen",
      Action: "Loeschen",
      Confirm: "Alle Nachrichten und Einstellungen wirklich loeschen?",
    },
  },
  InputTemplate: {
    Title: "Eingabevorlage",
    SubTitle: "Die neueste Nachricht wird in diese Vorlage eingefuegt",
  },
  AutoGenerateTitle: {
    Title: "Titel automatisch erzeugen",
    SubTitle: "Einen passenden Titel basierend auf dem Gespraech erzeugen",
  },
  Template: {
    Builtin: {
      Title: "Integrierte Vorlagen ausblenden",
      SubTitle: "Integrierte Vorlagen in der Vorlagenliste ausblenden",
    },
  },
  Prompt: {
    ...de.Settings?.Prompt,
    Modal: {
      ...de.Settings?.Prompt?.Modal,
      Title: "Prompt-Liste",
      Add: "Hinzufuegen",
      Search: "Prompts suchen",
      New: "Leerer Prompt",
      NewContent: "Leerer Prompt-Inhalt",
    },
    EditModal: {
      Title: "Prompt bearbeiten",
    },
  },
  THINKING: "Denken",
  ContextWindowLength: {
    Title: "Kontextfenster-Groesse",
    SubTitle: "Maximale Anzahl von Tokens fuer das Kontextfenster",
  },
  TopP: {
    Title: "Top P",
    SubTitle: "Diesen Wert nicht zusammen mit der Temperatur veraendern",
  },
  CacheType: {
    Title: "Cache-Typ",
    SubTitle: "IndexDB oder Cache API zum Speichern der Modellgewichte nutzen",
    Cache: "Cache",
    IndexDB: "Index DB",
  },
  LogLevel: {
    Title: "Protokollierungsstufe",
    SubTitle: "Detailgrad der Konsolenausgabe anpassen",
  },
  EnableThinking: {
    Title: "Denken aktivieren",
    SubTitle: "Erlaubt Modellen, schrittweise zu denken",
  },
  STT: {
    Title: "Sprache zu Text",
    SubTitle: "Einstellungen fuer Spracherkennung",
    Model: "Whisper-Modell",
    Language: "Whisper-Sprache",
  },
};

de.Download = {
  Success: "Inhalt wurde in dein Verzeichnis heruntergeladen.",
  Failed: "Download fehlgeschlagen.",
};

de.Context = {
  ...de.Context,
  Clear: "Kontext geloescht",
  Revert: "Rueckgaengig",
};

de.Template = {
  ...de.Template,
  Name: "Prompts",
  Page: {
    Title: "Prompt-Bibliothek",
    SubTitle: "Gespeicherte Prompt-Sammlung",
    Search: "Prompts suchen",
    Create: "Erstellen",
  },
  Item: {
    Info: (count: number) => `${count} Prompts`,
    Chat: "Chat",
    View: "Ansehen",
    Edit: "Bearbeiten",
    Delete: "Loeschen",
    DeleteConfirm: "Loeschen bestaetigen?",
  },
  EditModal: {
    Title: (readonly: boolean) =>
      `${readonly ? "Ansehen" : "Bearbeiten"} Prompt-Vorlage ${readonly ? "(schreibgeschuetzt)" : ""}`,
    Save: "Speichern",
    Download: "Herunterladen",
    Clone: "Klonen",
  },
  Config: {
    Avatar: "Bot-Avatar",
    Name: "Prompt-Name",
    HideContext: {
      Title: "Kontext-Prompts ausblenden",
      SubTitle: "Kontext-Prompts im Chat nicht anzeigen",
    },
    Share: {
      Title: "Diese Vorlage teilen",
      SubTitle: "Einen Link zu dieser Vorlage erzeugen",
      Action: "Link kopieren",
    },
  },
};

de.ModelSelect = {
  Title: "Modellauswahl",
  SearchPlaceholder: "Modell suchen...",
};

de.UI = {
  ...de.UI,
  Confirm: "Bestaetigen",
  Cancel: "Abbrechen",
  Close: "Schliessen",
  Create: "Erstellen",
  Edit: "Bearbeiten",
  Export: "Exportieren",
  Import: "Importieren",
  Sync: "Synchronisieren",
  Config: "Konfigurieren",
};

de.Exporter = {
  ...de.Exporter,
  Description: {
    Title: "Nur Nachrichten nach dem Leeren des Kontexts werden angezeigt",
  },
};

de.URLCommand = {
  Code: "Ein Zugriffscode wurde in der URL erkannt. Anwendung bestaetigen?",
  Settings: "Einstellungen wurden in der URL erkannt. Anwendung bestaetigen?",
};

de.ServiceWorker = {
  Error:
    "Der WebLLM-Worker hat die Verbindung verloren. Bitte alle Edu-Chat-Tabs schliessen und die App erneut oeffnen.",
};

de.Chat = {
  ...de.Chat,
  Actions: {
    ...de.Chat?.Actions,
    Stop: "Stopp",
    Delete: "Loeschen",
  },
  Metrics: {
    ...de.Chat?.Metrics,
    Prefill: "Vorfuellen",
    Decode: "Dekodierung",
  },
};

de.Settings = {
  ...de.Settings,
  Lang: {
    ...de.Settings?.Lang,
    Name: "Sprache",
  },
  Avatar: "Profilbild",
  SendPreviewBubble: {
    ...de.Settings?.SendPreviewBubble,
    SubTitle: "Markdown in der Sprechblase vorschauen",
  },
  Temperature: {
    ...de.Settings?.Temperature,
    Title: "Temperatur",
  },
  MaxTokens: {
    ...de.Settings?.MaxTokens,
    Title: "Maximale Tokens",
  },
  PresencePenalty: {
    ...de.Settings?.PresencePenalty,
    Title: "Praesenzstrafe",
  },
  FrequencyPenalty: {
    ...de.Settings?.FrequencyPenalty,
    Title: "Frequenzstrafe",
  },
  CacheType: {
    ...de.Settings?.CacheType,
    Cache: "Zwischenspeicher",
    IndexDB: "Indexdatenbank",
  },
};

de.Plugin = {
  ...de.Plugin,
  Name: "Erweiterung",
};

de.Template = {
  ...de.Template,
  Name: "Vorlagen",
  Item: {
    ...de.Template?.Item,
    Chat: "Gespraech",
  },
};

export default de;
