import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const eu: PartialLocaleType = {
  Title: "Edu Chat",
  Subtitle: "Nabigatzailean exekutatzen diren IA ereduak",
  WIP: "Laster...",
  ChatItem: {
    ChatItemCount: (count: number) => `${count} mezu`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} mezu Edu Chat-ekin`,
    Actions: {
      ChatList: "Txat zerrendara joan",
      CompressedHistory: "Memoria historia konprimitua",
      Export: "Mezu guztiak Markdown gisa esportatu",
      Copy: "Kopiatu",
      Play: "Erreproduzitu",
      Stop: "Gelditu",
      Retry: "Berriz saiatu",
      Delete: "Ezabatu",
      Transcribing: "Transkribatzen...",
      TranscribingFailed: "Transkripzioak huts egin du",
      MicrophoneDenied: "Mikrofonoaren baimena ukatu da",
      DownloadingModel: "Whisper eredua jaisten...",
      LoadingModel: "Eredua kargatzen...",
      Processing: "Prozesatzen...",
      Edit: "Editatu",
      EditConversation: "Elkarrizketa editatu",
    },
    Rename: "Txataren izena aldatu",
    Typing: "Idazten...",
    Input: (submitKey: string) => {
      let inputHints = `Idatzi zerbait eta sakatu ${submitKey} bidaltzeko`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", sakatu Shift + Enter lerro berria egiteko";
      }
      return inputHints;
    },
    Send: "Bidali",
    Config: {
      Reset: "Lehenetsira berrezarri",
      SaveAs: "Promptak gorde",
      Confirm: "Berretsi",
    },
  },
  Export: {
    Title: "Mezu guztiak",
    Copy: "Dena kopiatu",
    Download: "Deskargatu",
    MessageFromYou: "Zure mezua",
    MessageFromWebLLM: "Edu Chat-en mezua",
  },
  Memory: {
    Title: "Memoria historia",
    EmptyContent: "Oraindik ez dago ezer.",
    Copy: "Dena kopiatu",
    Send: "Memoria bidali",
    Reset: "Saioa berrezarri",
    ResetConfirm:
      "Berrezartzeak uneko elkarrizketaren historia eta memoria historikoa ezabatuko ditu. Ziur zaude?",
  },
  Home: {
    NewChat: "Txat berria",
    DeleteChat: "Hautatutako elkarrizketa ezabatu nahi duzu?",
    DeleteToast: "Txata ezabatu da",
    Revert: "Leheneratu",
  },
  Settings: {
    Title: "Ezarpenak",
    SubTitle: "Ezarpen guztiak",
    Lang: {
      Name: "Language",
      All: "Hizkuntza guztiak",
    },
    Avatar: "Avatarra",
    STT: {
      Title: "Ahotsetik testura",
      SubTitle: "Ahotsetik testurako ezarpenak",
      Model: "Whisper eredua",
      Language: "Whisper hizkuntza",
    },
    FontSize: {
      Title: "Letra tamaina",
      SubTitle: "Txateko edukiaren letra tamaina doitu",
    },
    InjectSystemPrompts: {
      Title: "Sistemako promptak txertatu",
      SubTitle: "Eskaera bakoitzean sistemako prompt orokor bat txertatu",
    },
    Update: {
      Version: (x: string) => `Bertsioa: ${x}`,
      IsLatest: "Azken bertsioa",
      CheckUpdate: "Eguneratzea egiaztatu",
      IsChecking: "Eguneratzea egiaztatzen...",
      FoundUpdate: (x: string) => `Bertsio berria aurkitu da: ${x}`,
      GoToUpdate: "Eguneratu",
    },
    SendKey: "Bidaltzeko tekla",
    Theme: "Gaia",
    TightBorder: "Ertz estua",
    SendPreviewBubble: {
      Title: "Bidalketa aurrebista burbuila",
      SubTitle: "Markdown-a burbuilan aurreikusi",
    },
    Prompt: {
      Disable: {
        Title: "Autobetetzea desgaitu",
        SubTitle: "Idatzi / autobetetzea aktibatzeko",
      },
      List: "Prompt zerrenda",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} integratu, ${custom} erabiltzaileak sortuak`,
      Edit: "Editatu",
      Modal: {
        Title: "Prompt zerrenda",
        Add: "Bat gehitu",
        Search: "Promptak bilatu",
        New: "Prompt hutsa",
        NewContent: "Prompt hutsaren edukia",
      },
      EditModal: {
        Title: "Prompta editatu",
      },
    },
    HistoryCount: {
      Title: "Erantsitako mezu kopurua",
      SubTitle: "Eskaera bakoitzean eransten diren mezu kopurua",
    },
    CompressThreshold: {
      Title: "Historia konpresio atalasea",
      SubTitle:
        "Konprimitu egingo da konprimitu gabeko mezuen luzerak balioa gainditzen badu",
    },
    Usage: {
      Title: "Kontuaren saldoa",
      SubTitle(used: any, total: any) {
        return `Erabilita $${used}, harpidetza $${total}`;
      },
      IsChecking: "Egiaztatzen...",
      Check: "Egiaztatu",
      NoAccess: "Sartu API gakoa saldoa egiaztatzeko",
    },
    Model: "Eredua",
    Temperature: {
      Title: "Tenperatura",
      SubTitle: "Balio handiago batek ausazkoagoa egiten du irteera",
    },
    MaxTokens: {
      Title: "Gehieneko tokenak",
      SubTitle: "Sarrerako eta sortutako tokenen gehieneko luzera",
    },
    PresencePenalty: {
      Title: "Presentzia penalizazioa",
      SubTitle:
        "Balio handiago batek gai berriez hitz egiteko probabilitatea handitzen du",
    },
    FrequencyPenalty: {
      Title: "Maiztasun penalizazioa",
      SubTitle:
        "Balio handiago batek lerro bera errepikatzeko probabilitatea murrizten du",
    },
    CacheType: {
      Title: "Cache mota",
      SubTitle: "IndexDB edo Cache API erabili ereduaren pisuak gordetzeko",
      Cache: "Cache",
      IndexDB: "Indexatutako datu-basea",
    },
  },
  Store: {
    DefaultTopic: "Elkarrizketa berria",
    BotHello: "Kaixo! Nola lagun zaitzaket gaur?",
    Error: "Zerbait gaizki joan da. Saiatu berriro geroago.",
    Prompt: {
      History: (content: string) =>
        "Hau da IAren eta erabiltzailearen arteko txat historiaren laburpena: " +
        content,
      Topic:
        "Sortu lau edo bost hitzeko izenburu bat gure elkarrizketa laburbiltzeko, puntuaziorik edo testu gehigarririk gabe.",
      Summarize:
        "Laburbildu gure elkarrizketa 200 karaktere edo gutxiagotan etorkizuneko testuingururako.",
    },
  },
  Copy: {
    Success: "Arbelera kopiatuta",
    Failed: "Kopiak huts egin du, eman arbela erabiltzeko baimena",
  },
  Context: {
    Toast: (x: any) => `${x} sistemako promptekin`,
    Edit: "Sistema eta memoria promptak",
    Add: "Bat gehitu",
  },
  Plugin: {
    Name: "Plugina",
  },
  FineTuned: {
    Sysmessage: "Laguntzaile bat zara eta",
  },
  NewChat: {
    Return: "Itzuli",
    Skip: "Saltatu",
    Title: "Aukeratu txantiloi bat",
    SubTitle: "Hasi txata txantiloi batekin",
    More: "Gehiago aurkitu",
    NotShow: "Ez berriro erakutsi",
    ConfirmNoShow:
      "Ziur zaude desgaitu nahi duzula? Geroago ezarpenetan gaitu ahal izango duzu.",
  },
  UI: {
    Confirm: "Berretsi",
    Cancel: "Utzi",
    Close: "Itxi",
    Create: "Sortu",
    Edit: "Editatu",
  },
  Exporter: {
    Model: "Eredua",
    Messages: "Mezuak",
    Topic: "Gaia",
    Time: "Ordua",
  },
};

export default eu;
