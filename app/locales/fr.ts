import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const fr: PartialLocaleType = {
  WIP: "Prochainement...",
  ChatItem: {
    ChatItemCount: (count: number) => `${count} messages en total`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} messages échangés avec ChatGPT`,
    Actions: {
      ChatList: "Aller à la liste de discussion",
      CompressedHistory: "Mémoire d'historique compressée Prompt",
      Export: "Exporter tous les messages en tant que Markdown",
      Copy: "Copier",
      Stop: "Arrêter",
      Retry: "Réessayer",
      Delete: "Supprimer",
      Edit: "Modifier",
    },
    Commands: {
      new: "Commencer une nouvelle conversation",
      newt: "Démarrer une nouvelle conversation avec un assistant",
      next: "Conversation suivante",
      prev: "Conversation précédente",
      clear: "Effacer le contexte",
      del: "Supprimer la Conversation",
    },
    InputActions: {
      Stop: "Stop",
      ToBottom: "Au dernier",
      Theme: {
        auto: "Auto",
        light: "Thème clair",
        dark: "Thème sombre",
      },
      Clear: "Effacer le contexte",
      Settings: "Réglages",
    },
    Rename: "Renommer la conversation",
    Typing: "En train d'écrire…",
    Input: (submitKey: string) => {
      var inputHints = `Appuyez sur ${submitKey} pour envoyer`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", Shift + Enter pour insérer un saut de ligne";
      }
      return inputHints + ", / pour rechercher des prompts";
    },
    Send: "Envoyer",
    Config: {
      Reset: "Restaurer les paramètres par défaut",
      SaveAs: "Enregistrer en tant que masque",
    },
  },
  Export: {
    Title: "Tous les messages",
    Copy: "Tout sélectionner",
    Download: "Télécharger",
    MessageFromYou: "Message de votre part",
    MessageFromWebLLM: "Message de WebLLM",
  },
  Memory: {
    Title: "Prompt mémoire",
    EmptyContent: "Rien encore.",
    Send: "Envoyer la mémoire",
    Copy: "Copier la mémoire",
    Reset: "Réinitialiser la session",
    ResetConfirm:
      "La réinitialisation supprimera l'historique de la conversation actuelle ainsi que la mémoire de l'historique. Êtes-vous sûr de vouloir procéder à la réinitialisation?",
  },
  Home: {
    NewChat: "Nouvelle discussion",
    DeleteChat: "Confirmer la suppression de la conversation sélectionnée ?",
    DeleteToast: "Conversation supprimée",
    Revert: "Revenir en arrière",
  },
  Settings: {
    Title: "Paramètres",
    SubTitle: "Toutes les configurations",
    Danger: {
      Reset: {
        Title: "Restaurer les paramètres",
        SubTitle: "Restaurer les paramètres par défaut",
        Action: "Reinitialiser",
        Confirm: "Confirmer la réinitialisation des paramètres?",
      },
      Clear: {
        Title: "Supprimer toutes les données",
        SubTitle:
          "Effacer toutes les données, y compris les conversations et les paramètres",
        Action: "Supprimer",
        Confirm: "Confirmer la suppression de toutes les données?",
      },
    },
    Lang: {
      Name: "Language", // ATTENTION : si vous souhaitez ajouter une nouvelle traduction, ne traduisez pas cette valeur, laissez-la sous forme de `Language`
      All: "Toutes les langues",
    },

    Avatar: "Avatar",
    FontSize: {
      Title: "Taille des polices",
      SubTitle: "Ajuste la taille de police du contenu de la conversation",
    },
    InjectSystemPrompts: {
      Title: "Injecter des invites système",
      SubTitle:
        "Ajoute de force une invite système simulée de ChatGPT au début de la liste des messages pour chaque demande",
    },
    InputTemplate: {
      Title: "Template",
      SubTitle: "Le message le plus récent sera ajouté à ce template.",
    },
    Update: {
      Version: (x: string) => `Version : ${x}`,
      IsLatest: "Dernière version",
      CheckUpdate: "Vérifier la mise à jour",
      IsChecking: "Vérification de la mise à jour...",
      FoundUpdate: (x: string) => `Nouvelle version disponible : ${x}`,
      GoToUpdate: "Mise à jour",
    },
    SendKey: "Clé d'envoi",
    Theme: "Thème",
    TightBorder: "Bordure serrée",
    SendPreviewBubble: {
      Title: "Aperçu de l'envoi dans une bulle",
      SubTitle: "Aperçu du Markdown dans une bulle",
    },
    Template: {
      Builtin: {
        Title: "Masquer Les Assistants Intégrés",
        SubTitle: "Masquer les assistants intégrés par défaut",
      },
    },
    Prompt: {
      Disable: {
        Title: "Désactiver la saisie semi-automatique",
        SubTitle: "Appuyez sur / pour activer la saisie semi-automatique",
      },
      List: "Liste de prompts",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} intégré, ${custom} personnalisé`,
      Edit: "Modifier",
      Modal: {
        Title: "Liste de prompts",
        Add: "Ajouter un élément",
        Search: "Rechercher des prompts",
      },
      EditModal: {
        Title: "Modifier le prompt",
      },
    },
    HistoryCount: {
      Title: "Nombre de messages joints",
      SubTitle: "Nombre de messages envoyés attachés par demande",
    },
    CompressThreshold: {
      Title: "Seuil de compression de l'historique",
      SubTitle:
        "Comprimera si la longueur des messages non compressés dépasse cette valeur",
    },

    Usage: {
      Title: "Solde du compte",
      SubTitle(used: any, total: any) {
        return `Épuisé ce mois-ci $${used}, abonnement $${total}`;
      },
      IsChecking: "Vérification...",
      Check: "Vérifier",
      NoAccess: "Entrez la clé API pour vérifier le solde",
    },

    Model: "Modèle",
    Temperature: {
      Title: "Température",
      SubTitle: "Une valeur plus élevée rendra les réponses plus aléatoires",
    },
    TopP: {
      Title: "Top P",
      SubTitle:
        "Ne modifiez pas à moins que vous ne sachiez ce que vous faites",
    },
    MaxTokens: {
      Title: "Limite de Tokens",
      SubTitle: "Longueur maximale des tokens d'entrée et des tokens générés",
    },
    PresencePenalty: {
      Title: "Pénalité de présence",
      SubTitle:
        "Une valeur plus élevée augmentera la probabilité d'introduire de nouveaux sujets",
    },
    FrequencyPenalty: {
      Title: "Pénalité de fréquence",
      SubTitle:
        "Une valeur plus élevée diminuant la probabilité de répéter la même ligne",
    },
  },
  Store: {
    DefaultTopic: "Nouvelle conversation",
    BotHello: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    Error: "Quelque chose s'est mal passé, veuillez réessayer plus tard.",
    Prompt: {
      History: (content: string) =>
        "Ceci est un résumé de l'historique des discussions entre l'IA et l'utilisateur : " +
        content,
      Topic:
        "Veuillez générer un titre de quatre à cinq mots résumant notre conversation sans introduction, ponctuation, guillemets, points, symboles ou texte supplémentaire. Supprimez les guillemets inclus.",
      Summarize:
        "Résumez brièvement nos discussions en 200 mots ou moins pour les utiliser comme prompt de contexte futur.",
    },
  },
  Copy: {
    Success: "Copié dans le presse-papiers",
    Failed:
      "La copie a échoué, veuillez accorder l'autorisation d'accès au presse-papiers",
  },
  Context: {
    Toast: (x: any) => `Avec ${x} contextes de prompts`,
    Edit: "Contextes et mémoires de prompts",
    Add: "Ajouter un prompt",
  },
  Plugin: {
    Name: "Extension",
  },
  FineTuned: {
    Sysmessage: "Eres un asistente que",
  },
  Template: {
    Name: "Masque",
    Page: {
      Title: "Modèle de prompt",
      Search: "Rechercher des modèles",
      Create: "Créer",
    },
    Item: {
      Info: (count: number) => `${count} prompts`,
      Chat: "Discussion",
      View: "Vue",
      Edit: "Modifier",
      Delete: "Supprimer",
      DeleteConfirm: "Confirmer la suppression?",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `Modifier le modèle de prompt ${readonly ? "(en lecture seule)" : ""}`,
      Download: "Télécharger",
      Clone: "Dupliquer",
    },
    Config: {
      Avatar: "Avatar de lassistant",
      Name: "Nom de lassistant",
      HideContext: {
        Title: "Masquer les invites contextuelles",
        SubTitle: "Ne pas afficher les instructions contextuelles dans le chat",
      },
      Share: {
        Title: "Partager ce masque",
        SubTitle: "Générer un lien vers ce masque",
        Action: "Copier le lien",
      },
    },
  },
  NewChat: {
    Return: "Retour",
    Skip: "Passer",
    Title: "Choisir un assitant",
    SubTitle: "Discutez avec l'âme derrière le masque",
    More: "En savoir plus",
    NotShow: "Ne pas afficher à nouveau",
    ConfirmNoShow:
      "Confirmez-vous vouloir désactiver cela? Vous pouvez le réactiver plus tard dans les paramètres.",
  },

  UI: {
    Confirm: "Confirmer",
    Cancel: "Annuler",
    Close: "Fermer",
    Create: "Créer",
    Edit: "Éditer",
  },
  Exporter: {
    Model: "Modèle",
    Messages: "Messages",
    Topic: "Sujet",
    Time: "Temps",
  },
};

fr.Title = "Edu Chat";
fr.Subtitle = "Modeles d'IA executant dans le navigateur";

fr.Chat = {
  ...fr.Chat,
  SubTitle: (count: number) => `${count} messages avec Edu Chat`,
  EditMessage: {
    Title: "Modifier tous les messages",
    Topic: {
      Title: "Sujet",
      SubTitle: "Changer le sujet actuel",
    },
  },
  Actions: {
    ...fr.Chat?.Actions,
    Play: "Lire",
    Share: "Partager",
    Transcribing: "Transcription en cours...",
    TranscribingFailed: "La transcription a echoue",
    MicrophoneDenied: "Acces au microphone refuse",
    DownloadingModel: "Telechargement du modele Whisper...",
    Processing: "Traitement...",
    LoadingModel: "Chargement du modele...",
    EditConversation: "Modifier la conversation",
  },
  Roles: {
    System: "Prompt systeme",
    Assistant: "Assistant",
    User: "Utilisateur",
  },
  InputActions: {
    ...fr.Chat?.InputActions,
    QuickPrompt: "Prompts rapides",
    UploadImage: "Importer des images",
  },
  Config: {
    ...fr.Chat?.Config,
    Confirm: "Confirmer",
  },
  IsContext: "Prompt systeme",
  Metrics: {
    Prefill: "Prefill",
    Decode: "Decode",
    TokensPerSec: "tok/s",
  },
};

fr.Export = {
  ...fr.Export,
  MessageFromWebLLM: "Message de Edu Chat",
  Share: "Partager",
  Format: {
    Title: "Format d'export",
    SubTitle: "Markdown ou image PNG",
  },
  IncludeContext: {
    Title: "Inclure le contexte",
    SubTitle: "Exporter ou non les prompts de contexte du modele",
  },
  Steps: {
    Select: "Selection",
    Preview: "Apercu",
  },
  Image: {
    Toast: "Capture de l'image...",
    Modal: "Appui long ou clic droit pour enregistrer l'image",
  },
};

fr.Select = {
  Search: "Rechercher",
  All: "Tout selectionner",
  Latest: "Selectionner le dernier",
  Clear: "Effacer",
};

fr.Settings = {
  ...fr.Settings,
  InjectSystemPrompts: {
    ...fr.Settings?.InjectSystemPrompts,
    SubTitle:
      "Ajouter de force un prompt systeme global au debut de chaque requete",
  },
  AutoGenerateTitle: {
    Title: "Generer le titre automatiquement",
    SubTitle: "Generer un titre adapte en fonction de la conversation",
  },
  Prompt: {
    ...fr.Settings?.Prompt,
    Modal: {
      ...fr.Settings?.Prompt?.Modal,
      New: "Prompt vide",
      NewContent: "Contenu vide du prompt",
    },
  },
  THINKING: "Raisonnement",
  ContextWindowLength: {
    Title: "Taille de la fenetre de contexte",
    SubTitle: "Nombre maximal de tokens pour la fenetre de contexte",
  },
  CacheType: {
    Title: "Type de cache",
    SubTitle: "Utiliser IndexDB ou Cache API pour stocker les poids du modele",
    Cache: "Cache",
    IndexDB: "Index DB",
  },
  LogLevel: {
    Title: "Niveau de journalisation",
    SubTitle: "Ajuster le niveau de detail affiche dans la console",
  },
  EnableThinking: {
    Title: "Activer le raisonnement",
    SubTitle: "Permettre aux modeles de raisonner etape par etape",
  },
  STT: {
    Title: "Voix vers texte",
    SubTitle: "Parametres de transcription vocale",
    Model: "Modele Whisper",
    Language: "Langue Whisper",
  },
};

fr.Download = {
  Success: "Contenu telecharge dans votre dossier.",
  Failed: "Le telechargement a echoue.",
};

fr.Context = {
  ...fr.Context,
  Clear: "Contexte efface",
  Revert: "Retablir",
};

fr.Template = {
  ...fr.Template,
  Page: {
    ...fr.Template?.Page,
    SubTitle: "Collection enregistree de prompts",
  },
  EditModal: {
    ...fr.Template?.EditModal,
    Save: "Enregistrer",
  },
};

fr.ModelSelect = {
  Title: "Selection du modele",
  SearchPlaceholder: "Rechercher un modele...",
};

fr.UI = {
  ...fr.UI,
  Export: "Exporter",
  Import: "Importer",
  Sync: "Synchroniser",
  Config: "Configurer",
};

fr.Exporter = {
  ...fr.Exporter,
  Description: {
    Title: "Seuls les messages apres nettoyage du contexte seront affiches",
  },
};

fr.URLCommand = {
  Code: "Un code d'acces a ete detecte dans l'URL. Confirmer l'application?",
  Settings:
    "Des parametres ont ete detectes dans l'URL. Confirmer l'application?",
};

fr.ServiceWorker = {
  Error:
    "Le worker WebLLM a perdu la connexion. Fermez tous les onglets Edu Chat puis reouvrez l'application.",
};

fr.Chat = {
  ...fr.Chat,
  Roles: {
    ...fr.Chat?.Roles,
    Assistant: "Assistant IA",
  },
  InputActions: {
    ...fr.Chat?.InputActions,
    Stop: "Arreter",
    Theme: {
      ...fr.Chat?.InputActions?.Theme,
      auto: "Automatique",
    },
  },
  Metrics: {
    ...fr.Chat?.Metrics,
    Prefill: "Pre-remplissage",
    Decode: "Decodage",
  },
};

fr.Settings = {
  ...fr.Settings,
  Lang: {
    ...fr.Settings?.Lang,
    Name: "Langue",
  },
  Avatar: "Image de profil",
  CacheType: {
    ...fr.Settings?.CacheType,
    Cache: "Memoire cache",
    IndexDB: "Base indexee",
  },
};

fr.Exporter = {
  ...fr.Exporter,
  Messages: "Messages exportes",
};

export default fr;
