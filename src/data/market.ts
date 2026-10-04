// AUTO-GENERATED FILE — DO NOT EDIT BY HAND.
// Regenerate with: bun run data:market
// Generated: 2026-10-03T18:53:41.559Z
//
// Sources: warframe.market /v1/tools/ducats (previous_day split) and /v2/items
// (id -> slug). Data belongs to warframe.market; game content © Digital
// Extremes Ltd. Non-commercial fan use only.

export interface MarketSnapshot {
  /** 48h trade median ask, in platinum. */
  median: number
  /** warframe.market item slug, for deep links. */
  slug: string
  /** 48h completed trade count. */
  volume: number
  /** "warframe.market price" in platinum (the sell-vs-burn income figure). */
  waPrice: number
}

/** warframe.market item id -> snapshot, for the relic-reward items only. */
export const MARKET: Record<string, MarketSnapshot> = {
  "65a7fcc4ed5b0d2e3eb462d0": {
    "median": 18.5,
    "slug": "acceltra_prime_barrel",
    "volume": 633,
    "waPrice": 22.58
  },
  "65a7fcc4ed5b0d2e3eb462cf": {
    "median": 4,
    "slug": "acceltra_prime_blueprint",
    "volume": 374,
    "waPrice": 4.28
  },
  "65a7fcc4ed5b0d2e3eb462d1": {
    "median": 5,
    "slug": "acceltra_prime_receiver",
    "volume": 373,
    "waPrice": 5.79
  },
  "65a7fcc4ed5b0d2e3eb462d2": {
    "median": 20,
    "slug": "acceltra_prime_stock",
    "volume": 376,
    "waPrice": 23.07
  },
  "6a330f5a58b60af8cd1a0d0f": {
    "median": 5,
    "slug": "afentis_prime_barrel",
    "volume": 434,
    "waPrice": 4.78
  },
  "6a330f5b58b60af8cd1a0d10": {
    "median": 10,
    "slug": "afentis_prime_blade",
    "volume": 337,
    "waPrice": 9.84
  },
  "6a330f5958b60af8cd1a0d0e": {
    "median": 15,
    "slug": "afentis_prime_blueprint",
    "volume": 517,
    "waPrice": 15.58
  },
  "6a330f5c58b60af8cd1a0d11": {
    "median": 5,
    "slug": "afentis_prime_handle",
    "volume": 207,
    "waPrice": 4.99
  },
  "639a941c74b02f008887784b": {
    "median": 8,
    "slug": "afuris_prime_barrel",
    "volume": 349,
    "waPrice": 7.81
  },
  "639a941d74b02f008887784f": {
    "median": 4,
    "slug": "afuris_prime_blueprint",
    "volume": 338,
    "waPrice": 4.3
  },
  "639a941d74b02f008887784d": {
    "median": 5,
    "slug": "afuris_prime_link",
    "volume": 324,
    "waPrice": 4.99
  },
  "639a941e74b02f0088877853": {
    "median": 35,
    "slug": "afuris_prime_receiver",
    "volume": 426,
    "waPrice": 36.35
  },
  "65a7fca4ed5b0d2e3eb462cb": {
    "median": 9,
    "slug": "akarius_prime_barrel",
    "volume": 413,
    "waPrice": 8.94
  },
  "65a7fca4ed5b0d2e3eb462ca": {
    "median": 15,
    "slug": "akarius_prime_blueprint",
    "volume": 389,
    "waPrice": 16.3
  },
  "65a7fca4ed5b0d2e3eb462cd": {
    "median": 5,
    "slug": "akarius_prime_link",
    "volume": 485,
    "waPrice": 4.63
  },
  "65a7fca4ed5b0d2e3eb462cc": {
    "median": 31,
    "slug": "akarius_prime_receiver",
    "volume": 906,
    "waPrice": 36.66
  },
  "5a311f85c2c9e90dfff475f7": {
    "median": 9,
    "slug": "akbolto_prime_barrel",
    "volume": 517,
    "waPrice": 8.9
  },
  "5a311f83c2c9e90dfff475d5": {
    "median": 5,
    "slug": "akbolto_prime_blueprint",
    "volume": 430,
    "waPrice": 4.52
  },
  "5a311f84c2c9e90dfff475f3": {
    "median": 5,
    "slug": "akbolto_prime_link",
    "volume": 595,
    "waPrice": 5.8
  },
  "5a311f83c2c9e90dfff475d4": {
    "median": 30,
    "slug": "akbolto_prime_receiver",
    "volume": 315,
    "waPrice": 30.16
  },
  "54a73e65e779893a797fff22": {
    "median": 2,
    "slug": "akbronco_prime_blueprint",
    "volume": 184,
    "waPrice": 2.09
  },
  "54a73e65e779893a797fff23": {
    "median": 3,
    "slug": "akbronco_prime_link",
    "volume": 347,
    "waPrice": 3.95
  },
  "5c196fac96037800ddadac12": {
    "median": 34,
    "slug": "akjagara_prime_barrel",
    "volume": 196,
    "waPrice": 34.22
  },
  "5c196fad96037800ddadac13": {
    "median": 4,
    "slug": "akjagara_prime_blueprint",
    "volume": 225,
    "waPrice": 4.4
  },
  "5c196fb496037800ddadac1a": {
    "median": 8,
    "slug": "akjagara_prime_link",
    "volume": 242,
    "waPrice": 8.1
  },
  "5c196fb096037800ddadac18": {
    "median": 12,
    "slug": "akjagara_prime_receiver",
    "volume": 241,
    "waPrice": 13.53
  },
  "588bc3bcc353473a172364f2": {
    "median": 10,
    "slug": "aklex_prime_blueprint",
    "volume": 402,
    "waPrice": 9.6
  },
  "588c7923c353473a172364f3": {
    "median": 39,
    "slug": "aklex_prime_link",
    "volume": 3801,
    "waPrice": 36.49
  },
  "66a51c8f66bbb2aedca694b1": {
    "median": 10,
    "slug": "akmagnus_prime_blueprint",
    "volume": 314,
    "waPrice": 11.48
  },
  "66a51c9166bbb2aedca694b2": {
    "median": 10,
    "slug": "akmagnus_prime_link",
    "volume": 418,
    "waPrice": 10.48
  },
  "5df955141456970150510f2a": {
    "median": 12,
    "slug": "aksomati_prime_barrel",
    "volume": 257,
    "waPrice": 12.84
  },
  "5df955141456970150510f28": {
    "median": 5,
    "slug": "aksomati_prime_blueprint",
    "volume": 169,
    "waPrice": 4.94
  },
  "5df955131456970150510f24": {
    "median": 40,
    "slug": "aksomati_prime_link",
    "volume": 224,
    "waPrice": 42.19
  },
  "5df955131456970150510f26": {
    "median": 9,
    "slug": "aksomati_prime_receiver",
    "volume": 261,
    "waPrice": 9.03
  },
  "573b804a0ec44a47787a6916": {
    "median": 15,
    "slug": "akstiletto_prime_barrel",
    "volume": 396,
    "waPrice": 17.31
  },
  "573b80450ec44a47787a6915": {
    "median": 17,
    "slug": "akstiletto_prime_blueprint",
    "volume": 248,
    "waPrice": 18.21
  },
  "573b80590ec44a47787a6918": {
    "median": 10,
    "slug": "akstiletto_prime_link",
    "volume": 160,
    "waPrice": 9.93
  },
  "573b804f0ec44a47787a6917": {
    "median": 24,
    "slug": "akstiletto_prime_receiver",
    "volume": 399,
    "waPrice": 27.19
  },
  "5bebf1713ffcc704caf38cf6": {
    "median": 30,
    "slug": "akvasto_prime_blueprint",
    "volume": 223,
    "waPrice": 31.48
  },
  "5bebf1713ffcc704caf38cf7": {
    "median": 13,
    "slug": "akvasto_prime_link",
    "volume": 402,
    "waPrice": 14.2
  },
  "6939aa8b5d9ebda239125d2d": {
    "median": 4,
    "slug": "alternox_prime_barrel",
    "volume": 333,
    "waPrice": 3.98
  },
  "6939aa8a5d9ebda239125d2c": {
    "median": 9,
    "slug": "alternox_prime_blueprint",
    "volume": 310,
    "waPrice": 8.77
  },
  "6939aa8c5d9ebda239125d2e": {
    "median": 4,
    "slug": "alternox_prime_receiver",
    "volume": 371,
    "waPrice": 3.89
  },
  "6939aa8d5d9ebda239125d2f": {
    "median": 10,
    "slug": "alternox_prime_stock",
    "volume": 241,
    "waPrice": 9.88
  },
  "54a73e65e779893a797fff24": {
    "median": 10,
    "slug": "ankyros_prime_blade",
    "volume": 371,
    "waPrice": 10.46
  },
  "54a73e65e779893a797fff25": {
    "median": 8,
    "slug": "ankyros_prime_blueprint",
    "volume": 181,
    "waPrice": 7.98
  },
  "54a73e65e779893a797fff26": {
    "median": 17,
    "slug": "ankyros_prime_gauntlet",
    "volume": 558,
    "waPrice": 17.94
  },
  "559daa9fe779897b3263c2c7": {
    "median": 14,
    "slug": "ash_prime_blueprint",
    "volume": 379,
    "waPrice": 14.43
  },
  "559daaa7e779897b35d626c6": {
    "median": 15,
    "slug": "ash_prime_chassis_blueprint",
    "volume": 379,
    "waPrice": 14.47
  },
  "559daab7e779897b3d86cb8f": {
    "median": 10,
    "slug": "ash_prime_neuroptics_blueprint",
    "volume": 319,
    "waPrice": 9.93
  },
  "559daaafe779897b399db0fd": {
    "median": 20,
    "slug": "ash_prime_systems_blueprint",
    "volume": 1007,
    "waPrice": 20.12
  },
  "60ad4a1cf1904300d012c707": {
    "median": 20,
    "slug": "astilla_prime_barrel",
    "volume": 241,
    "waPrice": 19.44
  },
  "60ad4a1cf1904300d012c704": {
    "median": 5,
    "slug": "astilla_prime_blueprint",
    "volume": 439,
    "waPrice": 5.04
  },
  "60ad4a1cf1904300d012c706": {
    "median": 9,
    "slug": "astilla_prime_receiver",
    "volume": 258,
    "waPrice": 8.91
  },
  "60ad4a1cf1904300d012c70b": {
    "median": 7,
    "slug": "astilla_prime_stock",
    "volume": 280,
    "waPrice": 7.22
  },
  "6a330fa158b60af8cd1a0d15": {
    "median": 10,
    "slug": "athodai_prime_barrel",
    "volume": 234,
    "waPrice": 9.74
  },
  "6a330f9f58b60af8cd1a0d14": {
    "median": 5,
    "slug": "athodai_prime_blueprint",
    "volume": 235,
    "waPrice": 4.53
  },
  "6a330fa358b60af8cd1a0d16": {
    "median": 10,
    "slug": "athodai_prime_receiver",
    "volume": 298,
    "waPrice": 9.52
  },
  "5d9385b27ea27b0a28fd75bc": {
    "median": 5,
    "slug": "atlas_prime_blueprint",
    "volume": 733,
    "waPrice": 7.99
  },
  "5d9385b17ea27b0a28fd75b8": {
    "median": 9,
    "slug": "atlas_prime_chassis_blueprint",
    "volume": 426,
    "waPrice": 8.74
  },
  "5d9385b27ea27b0a28fd75bb": {
    "median": 55,
    "slug": "atlas_prime_neuroptics_blueprint",
    "volume": 513,
    "waPrice": 56.95
  },
  "5d9385b17ea27b0a28fd75ba": {
    "median": 5,
    "slug": "atlas_prime_systems_blueprint",
    "volume": 407,
    "waPrice": 5.14
  },
  "59a5c2565cd9938cfede703d": {
    "median": 40,
    "slug": "ballistica_prime_blueprint",
    "volume": 224,
    "waPrice": 42.29
  },
  "59a5cd4d5cd9938cfede7044": {
    "median": 10,
    "slug": "ballistica_prime_lower_limb",
    "volume": 473,
    "waPrice": 12.02
  },
  "59a5cd4d5cd9938cfede7046": {
    "median": 9,
    "slug": "ballistica_prime_receiver",
    "volume": 487,
    "waPrice": 9.46
  },
  "59a5cd4d5cd9938cfede7045": {
    "median": 25,
    "slug": "ballistica_prime_string",
    "volume": 318,
    "waPrice": 27.42
  },
  "59a5cd4d5cd9938cfede7043": {
    "median": 15,
    "slug": "ballistica_prime_upper_limb",
    "volume": 344,
    "waPrice": 16.31
  },
  "58b57068eb26db5c3119210a": {
    "median": 10,
    "slug": "banshee_prime_blueprint",
    "volume": 902,
    "waPrice": 12.61
  },
  "58b57068eb26db5c3119210c": {
    "median": 30,
    "slug": "banshee_prime_chassis_blueprint",
    "volume": 731,
    "waPrice": 33.81
  },
  "58b57068eb26db5c3119210b": {
    "median": 5,
    "slug": "banshee_prime_neuroptics_blueprint",
    "volume": 820,
    "waPrice": 6.16
  },
  "58b57068eb26db5c3119210d": {
    "median": 20,
    "slug": "banshee_prime_systems_blueprint",
    "volume": 1233,
    "waPrice": 22.7
  },
  "639a8d9374b02f003889eb77": {
    "median": 19,
    "slug": "baruuk_prime_blueprint",
    "volume": 801,
    "waPrice": 20.61
  },
  "639a8d9374b02f003889eb71": {
    "median": 5,
    "slug": "baruuk_prime_chassis_blueprint",
    "volume": 413,
    "waPrice": 5.48
  },
  "639a8d9474b02f003889eb81": {
    "median": 15,
    "slug": "baruuk_prime_neuroptics_blueprint",
    "volume": 1178,
    "waPrice": 16.82
  },
  "639a8d9374b02f003889eb7e": {
    "median": 10,
    "slug": "baruuk_prime_systems_blueprint",
    "volume": 348,
    "waPrice": 9.48
  },
  "5df955131456970150510f27": {
    "median": 6,
    "slug": "baza_prime_barrel",
    "volume": 272,
    "waPrice": 7.8
  },
  "5df955121456970150510f21": {
    "median": 14,
    "slug": "baza_prime_blueprint",
    "volume": 263,
    "waPrice": 14.01
  },
  "5df955141456970150510f29": {
    "median": 8,
    "slug": "baza_prime_receiver",
    "volume": 258,
    "waPrice": 8.15
  },
  "5df955131456970150510f25": {
    "median": 34,
    "slug": "baza_prime_stock",
    "volume": 178,
    "waPrice": 33.62
  },
  "54a73e65e779893a797fff27": {
    "median": 18,
    "slug": "bo_prime_blueprint",
    "volume": 474,
    "waPrice": 18.81
  },
  "54a73e65e779893a797fff28": {
    "median": 20,
    "slug": "bo_prime_handle",
    "volume": 305,
    "waPrice": 19.44
  },
  "54a73e65e779893a797fff29": {
    "median": 25,
    "slug": "bo_prime_ornament",
    "volume": 1510,
    "waPrice": 28.98
  },
  "54a73e65e779893a797fff2a": {
    "median": 19.5,
    "slug": "boar_prime_barrel",
    "volume": 583,
    "waPrice": 19.93
  },
  "54a73e65e779893a797fff2b": {
    "median": 10,
    "slug": "boar_prime_blueprint",
    "volume": 749,
    "waPrice": 9.99
  },
  "54a73e65e779893a797fff2c": {
    "median": 17,
    "slug": "boar_prime_receiver",
    "volume": 648,
    "waPrice": 21.4
  },
  "54a73e65e779893a797fff2d": {
    "median": 49,
    "slug": "boar_prime_stock",
    "volume": 606,
    "waPrice": 50.91
  },
  "54a73e65e779893a797fff2e": {
    "median": 15,
    "slug": "boltor_prime_barrel",
    "volume": 359,
    "waPrice": 16.05
  },
  "54a73e65e779893a797fff2f": {
    "median": 19,
    "slug": "boltor_prime_blueprint",
    "volume": 346,
    "waPrice": 21.04
  },
  "54a73e65e779893a797fff30": {
    "median": 9,
    "slug": "boltor_prime_receiver",
    "volume": 537,
    "waPrice": 9.74
  },
  "54a73e65e779893a797fff31": {
    "median": 13,
    "slug": "boltor_prime_stock",
    "volume": 353,
    "waPrice": 14.84
  },
  "54a73e65e779893a797fff32": {
    "median": 4,
    "slug": "braton_prime_barrel",
    "volume": 338,
    "waPrice": 3.69
  },
  "54a73e65e779893a797fff33": {
    "median": 2,
    "slug": "braton_prime_blueprint",
    "volume": 294,
    "waPrice": 2.27
  },
  "54a73e65e779893a797fff34": {
    "median": 4,
    "slug": "braton_prime_receiver",
    "volume": 404,
    "waPrice": 4.6
  },
  "54a73e65e779893a797fff35": {
    "median": 2,
    "slug": "braton_prime_stock",
    "volume": 345,
    "waPrice": 2.14
  },
  "54a73e65e779893a797fff36": {
    "median": 3,
    "slug": "bronco_prime_barrel",
    "volume": 581,
    "waPrice": 4.23
  },
  "54a73e65e779893a797fff37": {
    "median": 5,
    "slug": "bronco_prime_blueprint",
    "volume": 228,
    "waPrice": 4.9
  },
  "54a73e65e779893a797fff38": {
    "median": 3,
    "slug": "bronco_prime_receiver",
    "volume": 235,
    "waPrice": 3.77
  },
  "54a73e65e779893a797fff39": {
    "median": 4,
    "slug": "burston_prime_barrel",
    "volume": 539,
    "waPrice": 4.66
  },
  "54a73e65e779893a797fff3a": {
    "median": 3,
    "slug": "burston_prime_blueprint",
    "volume": 249,
    "waPrice": 3.48
  },
  "54a73e65e779893a797fff3b": {
    "median": 3,
    "slug": "burston_prime_receiver",
    "volume": 390,
    "waPrice": 3.6
  },
  "54a73e65e779893a797fff3c": {
    "median": 4,
    "slug": "burston_prime_stock",
    "volume": 260,
    "waPrice": 3.75
  },
  "68adcffe731e63abe79a5d10": {
    "median": 3,
    "slug": "caliban_prime_blueprint",
    "volume": 660,
    "waPrice": 3.93
  },
  "68adcffe731e63abe79a5d12": {
    "median": 2,
    "slug": "caliban_prime_chassis_blueprint",
    "volume": 750,
    "waPrice": 2.85
  },
  "68adcffe731e63abe79a5d11": {
    "median": 12,
    "slug": "caliban_prime_neuroptics_blueprint",
    "volume": 462,
    "waPrice": 12.63
  },
  "68adcffe731e63abe79a5d13": {
    "median": 15,
    "slug": "caliban_prime_systems_blueprint",
    "volume": 722,
    "waPrice": 17.26
  },
  "559daac1e779897b4253a85e": {
    "median": 12,
    "slug": "carrier_prime_blueprint",
    "volume": 267,
    "waPrice": 11.76
  },
  "559daad1e779897b4be73862": {
    "median": 15,
    "slug": "carrier_prime_carapace",
    "volume": 271,
    "waPrice": 16.71
  },
  "559daacae779897b47b74c13": {
    "median": 50,
    "slug": "carrier_prime_cerebrum",
    "volume": 286,
    "waPrice": 52.44
  },
  "559daad8e779897b4f59525f": {
    "median": 9,
    "slug": "carrier_prime_systems",
    "volume": 313,
    "waPrice": 9.29
  },
  "67acd8fd125398d92c8bb4e2": {
    "median": 4,
    "slug": "cedo_prime_barrel",
    "volume": 528,
    "waPrice": 4.44
  },
  "67acd8fb125398d92c8bb4e0": {
    "median": 10,
    "slug": "cedo_prime_blueprint",
    "volume": 296,
    "waPrice": 9.39
  },
  "67acd8fc125398d92c8bb4e1": {
    "median": 3,
    "slug": "cedo_prime_receiver",
    "volume": 568,
    "waPrice": 3.93
  },
  "67acd8fd125398d92c8bb4e3": {
    "median": 5,
    "slug": "cedo_prime_stock",
    "volume": 212,
    "waPrice": 4.92
  },
  "583580d52c2ada003badef85": {
    "median": 5,
    "slug": "cernos_prime_blueprint",
    "volume": 187,
    "waPrice": 5.54
  },
  "583580fb2c2ada003badef88": {
    "median": 9,
    "slug": "cernos_prime_grip",
    "volume": 303,
    "waPrice": 8.89
  },
  "583580e12c2ada003badef86": {
    "median": 25,
    "slug": "cernos_prime_lower_limb",
    "volume": 239,
    "waPrice": 29.32
  },
  "583580fd2c2ada003badef89": {
    "median": 8,
    "slug": "cernos_prime_string",
    "volume": 316,
    "waPrice": 8.66
  },
  "583580f42c2ada003badef87": {
    "median": 9,
    "slug": "cernos_prime_upper_limb",
    "volume": 229,
    "waPrice": 9
  },
  "5ba9f2054567de01415f6390": {
    "median": 10,
    "slug": "chroma_prime_blueprint",
    "volume": 315,
    "waPrice": 9.78
  },
  "5ba9f2024567de01415f6388": {
    "median": 10,
    "slug": "chroma_prime_chassis_blueprint",
    "volume": 815,
    "waPrice": 15.05
  },
  "5ba9f2024567de01415f6389": {
    "median": 30,
    "slug": "chroma_prime_neuroptics_blueprint",
    "volume": 481,
    "waPrice": 32.46
  },
  "5ba9f2014567de01415f6387": {
    "median": 30,
    "slug": "chroma_prime_systems_blueprint",
    "volume": 404,
    "waPrice": 30.96
  },
  "6ab3f1b9626e0c6df7f6c9ae": {
    "median": 22,
    "slug": "citrine_prime_blueprint",
    "volume": 441,
    "waPrice": 22.45
  },
  "6ab3f1bd626e0c6df7f6c9b0": {
    "median": 12,
    "slug": "citrine_prime_chassis_blueprint",
    "volume": 436,
    "waPrice": 12.61
  },
  "6ab3f1bb626e0c6df7f6c9af": {
    "median": 46,
    "slug": "citrine_prime_neuroptics_blueprint",
    "volume": 273,
    "waPrice": 47.25
  },
  "6ab3f1c0626e0c6df7f6c9b1": {
    "median": 15,
    "slug": "citrine_prime_systems_blueprint",
    "volume": 456,
    "waPrice": 14.5
  },
  "639a941d74b02f0088877850": {
    "median": 5,
    "slug": "cobra_and_crane_prime_blade",
    "volume": 347,
    "waPrice": 5.51
  },
  "639a941d74b02f008887784e": {
    "median": 4,
    "slug": "cobra_and_crane_prime_blueprint",
    "volume": 382,
    "waPrice": 4.61
  },
  "639a941c74b02f008887784a": {
    "median": 14,
    "slug": "cobra_and_crane_prime_guard",
    "volume": 279,
    "waPrice": 14.26
  },
  "639a941d74b02f0088877851": {
    "median": 6,
    "slug": "cobra_and_crane_prime_hilt",
    "volume": 253,
    "waPrice": 6.02
  },
  "5e839494267539077b0dd6b4": {
    "median": 39,
    "slug": "corinth_prime_barrel",
    "volume": 862,
    "waPrice": 44.26
  },
  "5e839493267539077b0dd69e": {
    "median": 5,
    "slug": "corinth_prime_blueprint",
    "volume": 264,
    "waPrice": 5.11
  },
  "5e839494267539077b0dd6b5": {
    "median": 5,
    "slug": "corinth_prime_receiver",
    "volume": 391,
    "waPrice": 5.3
  },
  "5e839493267539077b0dd69a": {
    "median": 20,
    "slug": "corinth_prime_stock",
    "volume": 305,
    "waPrice": 19.71
  },
  "6ab3f278626e0c6df7f6c9ba": {
    "median": 7,
    "slug": "corufell_prime_blueprint",
    "volume": 294,
    "waPrice": 7.55
  },
  "6ab3f27b626e0c6df7f6c9bc": {
    "median": 9,
    "slug": "corufell_prime_handle",
    "volume": 555,
    "waPrice": 8.68
  },
  "6ab3f27d626e0c6df7f6c9bd": {
    "median": 30,
    "slug": "corufell_prime_receiver",
    "volume": 197,
    "waPrice": 29.42
  },
  "6ab3f279626e0c6df7f6c9bb": {
    "median": 10,
    "slug": "corufell_prime_stock",
    "volume": 182,
    "waPrice": 9.44
  },
  "6242037666a58f0108c3d47f": {
    "median": 27,
    "slug": "corvas_prime_barrel",
    "volume": 217,
    "waPrice": 28.93
  },
  "6242037666a58f0108c3d480": {
    "median": 7,
    "slug": "corvas_prime_blueprint",
    "volume": 215,
    "waPrice": 7.11
  },
  "6242037766a58f0108c3d48a": {
    "median": 8,
    "slug": "corvas_prime_receiver",
    "volume": 223,
    "waPrice": 8.45
  },
  "6242037666a58f0108c3d484": {
    "median": 5,
    "slug": "corvas_prime_stock",
    "volume": 190,
    "waPrice": 5.63
  },
  "682dfb5635715d4f3e9c64ed": {
    "median": 2,
    "slug": "daikyu_prime_blueprint",
    "volume": 216,
    "waPrice": 1.97
  },
  "682dfb5735715d4f3e9c64f0": {
    "median": 10,
    "slug": "daikyu_prime_grip",
    "volume": 310,
    "waPrice": 9.56
  },
  "682dfb5635715d4f3e9c64ee": {
    "median": 3,
    "slug": "daikyu_prime_lower_limb",
    "volume": 358,
    "waPrice": 4.01
  },
  "682dfb5735715d4f3e9c64f1": {
    "median": 4,
    "slug": "daikyu_prime_string",
    "volume": 257,
    "waPrice": 4.41
  },
  "682dfb5635715d4f3e9c64ef": {
    "median": 3,
    "slug": "daikyu_prime_upper_limb",
    "volume": 578,
    "waPrice": 3.77
  },
  "54a73e65e779893a797fff3d": {
    "median": 18,
    "slug": "dakra_prime_blade",
    "volume": 239,
    "waPrice": 17.85
  },
  "54a73e65e779893a797fff3e": {
    "median": 9,
    "slug": "dakra_prime_blueprint",
    "volume": 211,
    "waPrice": 8.82
  },
  "54a73e65e779893a797fff3f": {
    "median": 10,
    "slug": "dakra_prime_handle",
    "volume": 229,
    "waPrice": 9.38
  },
  "5b2985e0eb069f04ea65b0d8": {
    "median": 70,
    "slug": "destreza_prime_blade",
    "volume": 268,
    "waPrice": 75.15
  },
  "5b2985e3eb069f04ea65b0fb": {
    "median": 9,
    "slug": "destreza_prime_blueprint",
    "volume": 345,
    "waPrice": 9.12
  },
  "5b2985e3eb069f04ea65b0fd": {
    "median": 18,
    "slug": "destreza_prime_handle",
    "volume": 249,
    "waPrice": 18.47
  },
  "5d93ca117ea27b0a87566f6a": {
    "median": 25,
    "slug": "dethcube_prime_blueprint",
    "volume": 398,
    "waPrice": 26.02
  },
  "5d93ca107ea27b0a87566f5f": {
    "median": 5,
    "slug": "dethcube_prime_carapace",
    "volume": 610,
    "waPrice": 6.71
  },
  "5d93ca107ea27b0a87566f62": {
    "median": 35,
    "slug": "dethcube_prime_cerebrum",
    "volume": 1353,
    "waPrice": 37.38
  },
  "5d93ca117ea27b0a87566f6e": {
    "median": 8,
    "slug": "dethcube_prime_systems",
    "volume": 417,
    "waPrice": 8.12
  },
  "561536deb66f836f8bbaca47": {
    "median": 39,
    "slug": "dual_kamas_prime_blade",
    "volume": 352,
    "waPrice": 41.76
  },
  "561536d5b66f836f889b79bb": {
    "median": 8,
    "slug": "dual_kamas_prime_blueprint",
    "volume": 258,
    "waPrice": 8.02
  },
  "561536e4b66f836f8e15eb18": {
    "median": 9,
    "slug": "dual_kamas_prime_handle",
    "volume": 935,
    "waPrice": 9.68
  },
  "62d3494175156700ce450e05": {
    "median": 9,
    "slug": "dual_keres_prime_blade",
    "volume": 265,
    "waPrice": 8.86
  },
  "62d3494175156700ce450e00": {
    "median": 19,
    "slug": "dual_keres_prime_blueprint",
    "volume": 262,
    "waPrice": 18.7
  },
  "62d3494075156700ce450df3": {
    "median": 9,
    "slug": "dual_keres_prime_handle",
    "volume": 215,
    "waPrice": 8.74
  },
  "67acd915125398d92c8bb4e8": {
    "median": 11,
    "slug": "dual_zoren_prime_blade",
    "volume": 356,
    "waPrice": 12.23
  },
  "67acd913125398d92c8bb4e6": {
    "median": 3,
    "slug": "dual_zoren_prime_blueprint",
    "volume": 506,
    "waPrice": 3.75
  },
  "67acd914125398d92c8bb4e7": {
    "median": 3,
    "slug": "dual_zoren_prime_handle",
    "volume": 442,
    "waPrice": 3.08
  },
  "54a73e65e779893a797fff81": {
    "median": 30,
    "slug": "ember_prime_blueprint",
    "volume": 377,
    "waPrice": 29.5
  },
  "54a73e65e779893a797fff7e": {
    "median": 10,
    "slug": "ember_prime_chassis_blueprint",
    "volume": 1068,
    "waPrice": 18.29
  },
  "54a73e65e779893a797fff6d": {
    "median": 10,
    "slug": "ember_prime_neuroptics_blueprint",
    "volume": 593,
    "waPrice": 12.09
  },
  "54a73e65e779893a797fff7a": {
    "median": 10,
    "slug": "ember_prime_systems_blueprint",
    "volume": 322,
    "waPrice": 10.02
  },
  "66c60c2766bbb2aedca695a5": {
    "median": 4,
    "slug": "epitaph_prime_barrel",
    "volume": 393,
    "waPrice": 4.42
  },
  "66c60c2766bbb2aedca695a4": {
    "median": 7,
    "slug": "epitaph_prime_blueprint",
    "volume": 282,
    "waPrice": 7.43
  },
  "66c60c2766bbb2aedca695a6": {
    "median": 13,
    "slug": "epitaph_prime_receiver",
    "volume": 343,
    "waPrice": 13.11
  },
  "5ca28670fc2db2035eae05a6": {
    "median": 14,
    "slug": "equinox_prime_blueprint",
    "volume": 350,
    "waPrice": 14.36
  },
  "5ca28670fc2db2035eae05a1": {
    "median": 5,
    "slug": "equinox_prime_chassis_blueprint",
    "volume": 549,
    "waPrice": 6.99
  },
  "5ca28670fc2db2035eae05a5": {
    "median": 9,
    "slug": "equinox_prime_neuroptics_blueprint",
    "volume": 488,
    "waPrice": 8.83
  },
  "5ca28670fc2db2035eae05a0": {
    "median": 34,
    "slug": "equinox_prime_systems_blueprint",
    "volume": 342,
    "waPrice": 34.49
  },
  "58b57068eb26db5c3119210f": {
    "median": 5,
    "slug": "euphona_prime_barrel",
    "volume": 497,
    "waPrice": 5.83
  },
  "58b57068eb26db5c31192112": {
    "median": 5,
    "slug": "euphona_prime_blueprint",
    "volume": 457,
    "waPrice": 4.64
  },
  "58b57068eb26db5c31192111": {
    "median": 30,
    "slug": "euphona_prime_receiver",
    "volume": 248,
    "waPrice": 30.16
  },
  "54a73e65e779893a797fff40": {
    "median": 4,
    "slug": "fang_prime_blade",
    "volume": 246,
    "waPrice": 4.21
  },
  "54a73e65e779893a797fff41": {
    "median": 2,
    "slug": "fang_prime_blueprint",
    "volume": 176,
    "waPrice": 1.7
  },
  "54a73e65e779893a797fff42": {
    "median": 2,
    "slug": "fang_prime_handle",
    "volume": 478,
    "waPrice": 2.85
  },
  "573b801c0ec44a47787a6911": {
    "median": 13,
    "slug": "fragor_prime_blueprint",
    "volume": 202,
    "waPrice": 14.28
  },
  "573b80230ec44a47787a6912": {
    "median": 14,
    "slug": "fragor_prime_handle",
    "volume": 244,
    "waPrice": 13.39
  },
  "573b80280ec44a47787a6913": {
    "median": 10,
    "slug": "fragor_prime_head",
    "volume": 267,
    "waPrice": 10.16
  },
  "54a73e65e779893a797fff80": {
    "median": 43,
    "slug": "frost_prime_blueprint",
    "volume": 411,
    "waPrice": 45.26
  },
  "54a73e65e779893a797fff7d": {
    "median": 15,
    "slug": "frost_prime_chassis_blueprint",
    "volume": 456,
    "waPrice": 16.39
  },
  "54a73e65e779893a797fff6c": {
    "median": 10,
    "slug": "frost_prime_neuroptics_blueprint",
    "volume": 848,
    "waPrice": 14.95
  },
  "54a73e65e779893a797fff79": {
    "median": 14,
    "slug": "frost_prime_systems_blueprint",
    "volume": 532,
    "waPrice": 14.98
  },
  "64c2aa1466456704eba6ba32": {
    "median": 5,
    "slug": "fulmin_prime_barrel",
    "volume": 255,
    "waPrice": 5.12
  },
  "64c2aa1466456704eba6ba30": {
    "median": 5,
    "slug": "fulmin_prime_blueprint",
    "volume": 265,
    "waPrice": 5.69
  },
  "64c2aa1666456704eba6ba46": {
    "median": 29,
    "slug": "fulmin_prime_receiver",
    "volume": 253,
    "waPrice": 28.53
  },
  "64c2aa1466456704eba6ba37": {
    "median": 7,
    "slug": "fulmin_prime_stock",
    "volume": 328,
    "waPrice": 7.19
  },
  "57bc9c99e506eb45ea25145c": {
    "median": 6,
    "slug": "galatine_prime_blade",
    "volume": 327,
    "waPrice": 6.64
  },
  "57bc9c99e506eb45ea25145d": {
    "median": 45,
    "slug": "galatine_prime_blueprint",
    "volume": 129,
    "waPrice": 46.12
  },
  "57bc9c99e506eb45ea25145b": {
    "median": 7.5,
    "slug": "galatine_prime_handle",
    "volume": 327,
    "waPrice": 7.82
  },
  "60ad4a1bf1904300d012c6ff": {
    "median": 30,
    "slug": "gara_prime_blueprint",
    "volume": 1324,
    "waPrice": 34.89
  },
  "60ad4a1df1904300d012c70e": {
    "median": 17,
    "slug": "gara_prime_chassis_blueprint",
    "volume": 452,
    "waPrice": 17.11
  },
  "60ad4a1cf1904300d012c702": {
    "median": 8,
    "slug": "gara_prime_neuroptics_blueprint",
    "volume": 637,
    "waPrice": 8.11
  },
  "60ad4a1cf1904300d012c703": {
    "median": 9,
    "slug": "gara_prime_systems_blueprint",
    "volume": 400,
    "waPrice": 8.94
  },
  "6242037866a58f0108c3d497": {
    "median": 5,
    "slug": "garuda_prime_blueprint",
    "volume": 302,
    "waPrice": 5.01
  },
  "6242037666a58f0108c3d479": {
    "median": 9,
    "slug": "garuda_prime_chassis_blueprint",
    "volume": 513,
    "waPrice": 9.1
  },
  "6242037766a58f0108c3d492": {
    "median": 30,
    "slug": "garuda_prime_neuroptics_blueprint",
    "volume": 298,
    "waPrice": 30.09
  },
  "6242037666a58f0108c3d486": {
    "median": 35,
    "slug": "garuda_prime_systems_blueprint",
    "volume": 2363,
    "waPrice": 35.65
  },
  "65a7fc5aed5b0d2e3eb462b3": {
    "median": 5,
    "slug": "gauss_prime_blueprint",
    "volume": 836,
    "waPrice": 5.06
  },
  "65a7fc5aed5b0d2e3eb462b5": {
    "median": 5,
    "slug": "gauss_prime_chassis_blueprint",
    "volume": 544,
    "waPrice": 5.64
  },
  "65a7fc5aed5b0d2e3eb462b4": {
    "median": 10,
    "slug": "gauss_prime_neuroptics_blueprint",
    "volume": 595,
    "waPrice": 9.77
  },
  "65a7fc5aed5b0d2e3eb462b6": {
    "median": 30,
    "slug": "gauss_prime_systems_blueprint",
    "volume": 396,
    "waPrice": 31.77
  },
  "54a73e65e779893a797fff43": {
    "median": 20,
    "slug": "glaive_prime_blade",
    "volume": 429,
    "waPrice": 20.06
  },
  "54a73e65e779893a797fff44": {
    "median": 20,
    "slug": "glaive_prime_blueprint",
    "volume": 447,
    "waPrice": 20.28
  },
  "54a73e65e779893a797fff45": {
    "median": 10,
    "slug": "glaive_prime_disc",
    "volume": 468,
    "waPrice": 9.6
  },
  "5baa8bbf4567de01ac283496": {
    "median": 5,
    "slug": "gram_prime_blade",
    "volume": 255,
    "waPrice": 5.17
  },
  "5baa8bbf4567de01ac283495": {
    "median": 9,
    "slug": "gram_prime_blueprint",
    "volume": 201,
    "waPrice": 8.74
  },
  "5baa8bbf4567de01ac283492": {
    "median": 24,
    "slug": "gram_prime_handle",
    "volume": 217,
    "waPrice": 23.93
  },
  "653060f332327ba8746da745": {
    "median": 16,
    "slug": "grendel_prime_blueprint",
    "volume": 363,
    "waPrice": 16.97
  },
  "653060f332327ba8746da747": {
    "median": 5,
    "slug": "grendel_prime_chassis_blueprint",
    "volume": 455,
    "waPrice": 6.5
  },
  "653060f332327ba8746da746": {
    "median": 8,
    "slug": "grendel_prime_neuroptics_blueprint",
    "volume": 334,
    "waPrice": 7.85
  },
  "653060f332327ba8746da748": {
    "median": 35,
    "slug": "grendel_prime_systems_blueprint",
    "volume": 1230,
    "waPrice": 35.31
  },
  "5f986cf99dbdce024971b0b8": {
    "median": 10,
    "slug": "guandao_prime_blade",
    "volume": 330,
    "waPrice": 9.41
  },
  "5f986cf99dbdce024971b0bb": {
    "median": 5,
    "slug": "guandao_prime_blueprint",
    "volume": 235,
    "waPrice": 5.75
  },
  "5f986cf99dbdce024971b0bc": {
    "median": 24,
    "slug": "guandao_prime_handle",
    "volume": 245,
    "waPrice": 24.36
  },
  "64c2aa1566456704eba6ba3f": {
    "median": 18,
    "slug": "gunsen_prime_blade",
    "volume": 304,
    "waPrice": 18.82
  },
  "64c2aa1466456704eba6ba2e": {
    "median": 4,
    "slug": "gunsen_prime_blueprint",
    "volume": 219,
    "waPrice": 4.21
  },
  "64c2aa1466456704eba6ba31": {
    "median": 8,
    "slug": "gunsen_prime_handle",
    "volume": 352,
    "waPrice": 8.29
  },
  "6939aa415d9ebda239125d26": {
    "median": 5,
    "slug": "gyre_prime_blueprint",
    "volume": 590,
    "waPrice": 4.86
  },
  "6939aa445d9ebda239125d28": {
    "median": 8,
    "slug": "gyre_prime_chassis_blueprint",
    "volume": 493,
    "waPrice": 8.46
  },
  "6939aa435d9ebda239125d27": {
    "median": 10,
    "slug": "gyre_prime_neuroptics_blueprint",
    "volume": 420,
    "waPrice": 9.71
  },
  "6939aa455d9ebda239125d29": {
    "median": 4,
    "slug": "gyre_prime_systems_blueprint",
    "volume": 467,
    "waPrice": 4.38
  },
  "61bb64fc3132ff00482b5fba": {
    "median": 7,
    "slug": "harrow_prime_blueprint",
    "volume": 529,
    "waPrice": 7.62
  },
  "61bb64fe3132ff00482b5fce": {
    "median": 10,
    "slug": "harrow_prime_chassis_blueprint",
    "volume": 229,
    "waPrice": 9.97
  },
  "61bb64fd3132ff00482b5fc4": {
    "median": 10,
    "slug": "harrow_prime_neuroptics_blueprint",
    "volume": 493,
    "waPrice": 9.41
  },
  "61bb64fe3132ff00482b5fd2": {
    "median": 39,
    "slug": "harrow_prime_systems_blueprint",
    "volume": 701,
    "waPrice": 44.2
  },
  "58b57068eb26db5c31192118": {
    "median": 9,
    "slug": "helios_prime_blueprint",
    "volume": 464,
    "waPrice": 8.79
  },
  "58b57068eb26db5c31192116": {
    "median": 5,
    "slug": "helios_prime_carapace",
    "volume": 854,
    "waPrice": 6.16
  },
  "58b57068eb26db5c31192115": {
    "median": 25,
    "slug": "helios_prime_cerebrum",
    "volume": 519,
    "waPrice": 25.67
  },
  "58b57068eb26db5c31192117": {
    "median": 10,
    "slug": "helios_prime_systems",
    "volume": 444,
    "waPrice": 9.79
  },
  "54a73e65e779893a797fff46": {
    "median": 5,
    "slug": "hikou_prime_blueprint",
    "volume": 190,
    "waPrice": 4.75
  },
  "54a73e65e779893a797fff47": {
    "median": 10,
    "slug": "hikou_prime_pouch",
    "volume": 197,
    "waPrice": 10.34
  },
  "54a73e65e779893a797fff48": {
    "median": 10,
    "slug": "hikou_prime_stars",
    "volume": 290,
    "waPrice": 9.59
  },
  "641263df7d179f02100c6d40": {
    "median": 40,
    "slug": "hildryn_prime_blueprint",
    "volume": 1243,
    "waPrice": 39.17
  },
  "641263e07d179f02100c6d4b": {
    "median": 11,
    "slug": "hildryn_prime_chassis_blueprint",
    "volume": 536,
    "waPrice": 11.69
  },
  "641263e07d179f02100c6d46": {
    "median": 10,
    "slug": "hildryn_prime_neuroptics_blueprint",
    "volume": 539,
    "waPrice": 9.38
  },
  "641263e07d179f02100c6d41": {
    "median": 5,
    "slug": "hildryn_prime_systems_blueprint",
    "volume": 711,
    "waPrice": 4.67
  },
  "59a48b625cd9938cfede7038": {
    "median": 19,
    "slug": "hydroid_prime_blueprint",
    "volume": 504,
    "waPrice": 22.1
  },
  "59a48b625cd9938cfede703a": {
    "median": 10,
    "slug": "hydroid_prime_chassis_blueprint",
    "volume": 401,
    "waPrice": 9.38
  },
  "59a48b625cd9938cfede7039": {
    "median": 15,
    "slug": "hydroid_prime_neuroptics_blueprint",
    "volume": 455,
    "waPrice": 15.84
  },
  "59a48b625cd9938cfede703b": {
    "median": 40,
    "slug": "hydroid_prime_systems_blueprint",
    "volume": 796,
    "waPrice": 39.41
  },
  "62d3494175156700ce450dfd": {
    "median": 6,
    "slug": "hystrix_prime_barrel",
    "volume": 271,
    "waPrice": 7.14
  },
  "62d3493f75156700ce450de7": {
    "median": 6.5,
    "slug": "hystrix_prime_blueprint",
    "volume": 241,
    "waPrice": 7.05
  },
  "62d3494075156700ce450df7": {
    "median": 20,
    "slug": "hystrix_prime_receiver",
    "volume": 285,
    "waPrice": 23.43
  },
  "5f0deab79f527b024d48f058": {
    "median": 10,
    "slug": "inaros_prime_blueprint",
    "volume": 331,
    "waPrice": 9.49
  },
  "5f0deab69f527b024d48f056": {
    "median": 5,
    "slug": "inaros_prime_chassis_blueprint",
    "volume": 490,
    "waPrice": 5.74
  },
  "5f0deab69f527b024d48f057": {
    "median": 42,
    "slug": "inaros_prime_neuroptics_blueprint",
    "volume": 385,
    "waPrice": 42.37
  },
  "5f0deab79f527b024d48f059": {
    "median": 10,
    "slug": "inaros_prime_systems_blueprint",
    "volume": 386,
    "waPrice": 9.33
  },
  "5df8b0aa1456970087cd9aff": {
    "median": 10,
    "slug": "ivara_prime_blueprint",
    "volume": 610,
    "waPrice": 12.8
  },
  "5df8b0ab1456970087cd9b02": {
    "median": 29,
    "slug": "ivara_prime_chassis_blueprint",
    "volume": 668,
    "waPrice": 30.43
  },
  "5df8b0ab1456970087cd9b01": {
    "median": 8,
    "slug": "ivara_prime_neuroptics_blueprint",
    "volume": 467,
    "waPrice": 7.74
  },
  "5df8b0ac1456970087cd9b03": {
    "median": 10,
    "slug": "ivara_prime_systems_blueprint",
    "volume": 259,
    "waPrice": 10.07
  },
  "5f0e0fde9f527b0285718f1f": {
    "median": 25,
    "slug": "karyst_prime_blade",
    "volume": 245,
    "waPrice": 27.7
  },
  "5f0e0fde9f527b0285718f1e": {
    "median": 7,
    "slug": "karyst_prime_blueprint",
    "volume": 179,
    "waPrice": 7.09
  },
  "5f0e0fdc9f527b0285718f18": {
    "median": 5,
    "slug": "karyst_prime_handle",
    "volume": 266,
    "waPrice": 5.22
  },
  "56153734b66f836f976f5501": {
    "median": 8,
    "slug": "kavasa_prime_band",
    "volume": 223,
    "waPrice": 8.18
  },
  "56153730b66f836f9488bcce": {
    "median": 22,
    "slug": "kavasa_prime_buckle",
    "volume": 102,
    "waPrice": 22.82
  },
  "56153727b66f836f91a8e849": {
    "median": 8,
    "slug": "kavasa_prime_kubrow_collar_blueprint",
    "volume": 185,
    "waPrice": 7.78
  },
  "6939aaca5d9ebda239125d34": {
    "median": 5,
    "slug": "kestrel_prime_blade",
    "volume": 231,
    "waPrice": 4.74
  },
  "6939aac85d9ebda239125d32": {
    "median": 4,
    "slug": "kestrel_prime_blueprint",
    "volume": 296,
    "waPrice": 3.79
  },
  "6939aac95d9ebda239125d33": {
    "median": 10,
    "slug": "kestrel_prime_grip",
    "volume": 258,
    "waPrice": 9.41
  },
  "62d3494075156700ce450df5": {
    "median": 33,
    "slug": "khora_prime_blueprint",
    "volume": 647,
    "waPrice": 33.26
  },
  "62d3493f75156700ce450ded": {
    "median": 10,
    "slug": "khora_prime_chassis_blueprint",
    "volume": 370,
    "waPrice": 9.48
  },
  "62d3494175156700ce450dff": {
    "median": 30,
    "slug": "khora_prime_neuroptics_blueprint",
    "volume": 733,
    "waPrice": 29.83
  },
  "62d3494175156700ce450e04": {
    "median": 9,
    "slug": "khora_prime_systems_blueprint",
    "volume": 435,
    "waPrice": 8.89
  },
  "61bb64fd3132ff00482b5fc0": {
    "median": 35,
    "slug": "knell_prime_barrel",
    "volume": 262,
    "waPrice": 34.58
  },
  "61bb64fd3132ff00482b5fc6": {
    "median": 5,
    "slug": "knell_prime_blueprint",
    "volume": 174,
    "waPrice": 4.75
  },
  "61bb64fe3132ff00482b5fd5": {
    "median": 5,
    "slug": "knell_prime_receiver",
    "volume": 230,
    "waPrice": 5.2
  },
  "5a311f84c2c9e90dfff475e5": {
    "median": 5,
    "slug": "kogake_prime_blueprint",
    "volume": 454,
    "waPrice": 5.13
  },
  "5a311f84c2c9e90dfff475e4": {
    "median": 7,
    "slug": "kogake_prime_boot",
    "volume": 494,
    "waPrice": 7.47
  },
  "5a311f85c2c9e90dfff475f6": {
    "median": 20,
    "slug": "kogake_prime_gauntlet",
    "volume": 595,
    "waPrice": 24.91
  },
  "682dfb8835715d4f3e9c64f5": {
    "median": 9,
    "slug": "kompressa_prime_barrel",
    "volume": 422,
    "waPrice": 10.03
  },
  "682dfb8835715d4f3e9c64f4": {
    "median": 2,
    "slug": "kompressa_prime_blueprint",
    "volume": 332,
    "waPrice": 1.96
  },
  "682dfb8835715d4f3e9c64f6": {
    "median": 5,
    "slug": "kompressa_prime_receiver",
    "volume": 467,
    "waPrice": 4.64
  },
  "5ab167b9b2b6a80475780fd1": {
    "median": 40,
    "slug": "kronen_prime_blade",
    "volume": 241,
    "waPrice": 39.69
  },
  "5ab167b7b2b6a80475780fad": {
    "median": 5,
    "slug": "kronen_prime_blueprint",
    "volume": 312,
    "waPrice": 4.54
  },
  "5ab167b7b2b6a80475780fb5": {
    "median": 10,
    "slug": "kronen_prime_handle",
    "volume": 303,
    "waPrice": 10.88
  },
  "641263e07d179f02100c6d47": {
    "median": 45,
    "slug": "larkspur_prime_barrel",
    "volume": 408,
    "waPrice": 45.63
  },
  "641263e07d179f02100c6d4e": {
    "median": 8,
    "slug": "larkspur_prime_blueprint",
    "volume": 349,
    "waPrice": 7.66
  },
  "641263e07d179f02100c6d4c": {
    "median": 10,
    "slug": "larkspur_prime_receiver",
    "volume": 443,
    "waPrice": 9.6
  },
  "641263e07d179f02100c6d4a": {
    "median": 9,
    "slug": "larkspur_prime_stock",
    "volume": 381,
    "waPrice": 9.18
  },
  "54a73e65e779893a797fff49": {
    "median": 20,
    "slug": "latron_prime_barrel",
    "volume": 704,
    "waPrice": 23.17
  },
  "54a73e65e779893a797fff4a": {
    "median": 20,
    "slug": "latron_prime_blueprint",
    "volume": 428,
    "waPrice": 23.32
  },
  "54a73e65e779893a797fff4b": {
    "median": 20,
    "slug": "latron_prime_receiver",
    "volume": 801,
    "waPrice": 21.42
  },
  "54a73e65e779893a797fff4c": {
    "median": 22,
    "slug": "latron_prime_stock",
    "volume": 652,
    "waPrice": 24.09
  },
  "67acd941125398d92c8bb4eb": {
    "median": 4,
    "slug": "lavos_prime_blueprint",
    "volume": 607,
    "waPrice": 4.51
  },
  "67acd944125398d92c8bb4ed": {
    "median": 2,
    "slug": "lavos_prime_chassis_blueprint",
    "volume": 562,
    "waPrice": 2.29
  },
  "67acd943125398d92c8bb4ec": {
    "median": 7,
    "slug": "lavos_prime_neuroptics_blueprint",
    "volume": 543,
    "waPrice": 7.04
  },
  "67acd945125398d92c8bb4ee": {
    "median": 13,
    "slug": "lavos_prime_systems_blueprint",
    "volume": 606,
    "waPrice": 14.42
  },
  "54a73e65e779893a797fff4d": {
    "median": 4,
    "slug": "lex_prime_barrel",
    "volume": 316,
    "waPrice": 4.04
  },
  "54a73e65e779893a797fff4e": {
    "median": 3,
    "slug": "lex_prime_blueprint",
    "volume": 277,
    "waPrice": 3.54
  },
  "54a73e65e779893a797fff4f": {
    "median": 4,
    "slug": "lex_prime_receiver",
    "volume": 260,
    "waPrice": 4.36
  },
  "5b2987aaeb069f0536234276": {
    "median": 8,
    "slug": "limbo_prime_blueprint",
    "volume": 455,
    "waPrice": 8.18
  },
  "5b2987abeb069f053623427a": {
    "median": 50,
    "slug": "limbo_prime_chassis_blueprint",
    "volume": 313,
    "waPrice": 50.32
  },
  "5b2987abeb069f0536234277": {
    "median": 30,
    "slug": "limbo_prime_neuroptics_blueprint",
    "volume": 512,
    "waPrice": 30.48
  },
  "5b2987abeb069f0536234279": {
    "median": 5,
    "slug": "limbo_prime_systems_blueprint",
    "volume": 471,
    "waPrice": 4.84
  },
  "54a73e65e779893a797fff7c": {
    "median": 10,
    "slug": "loki_prime_blueprint",
    "volume": 939,
    "waPrice": 15.62
  },
  "54a73e65e779893a797fff75": {
    "median": 25,
    "slug": "loki_prime_chassis_blueprint",
    "volume": 511,
    "waPrice": 27.3
  },
  "54a73e65e779893a797fff70": {
    "median": 17,
    "slug": "loki_prime_neuroptics_blueprint",
    "volume": 582,
    "waPrice": 17.93
  },
  "54a73e65e779893a797fff74": {
    "median": 34,
    "slug": "loki_prime_systems_blueprint",
    "volume": 557,
    "waPrice": 33.48
  },
  "54a73e65e779893a797fff82": {
    "median": 39,
    "slug": "mag_prime_blueprint",
    "volume": 579,
    "waPrice": 41.11
  },
  "54a73e65e779893a797fff83": {
    "median": 10,
    "slug": "mag_prime_chassis_blueprint",
    "volume": 742,
    "waPrice": 11.96
  },
  "54a73e65e779893a797fff6e": {
    "median": 10,
    "slug": "mag_prime_neuroptics_blueprint",
    "volume": 892,
    "waPrice": 12.18
  },
  "54a73e65e779893a797fff7b": {
    "median": 19,
    "slug": "mag_prime_systems_blueprint",
    "volume": 484,
    "waPrice": 18.17
  },
  "6139101b30dd5b004b7f90af": {
    "median": 28,
    "slug": "magnus_prime_barrel",
    "volume": 289,
    "waPrice": 28.84
  },
  "6139101a30dd5b004b7f90a2": {
    "median": 8,
    "slug": "magnus_prime_blueprint",
    "volume": 253,
    "waPrice": 8.3
  },
  "6139101b30dd5b004b7f90ae": {
    "median": 7,
    "slug": "magnus_prime_receiver",
    "volume": 442,
    "waPrice": 7.19
  },
  "6530690f22c7fd9770508546": {
    "median": 16,
    "slug": "masseter_prime_blade",
    "volume": 382,
    "waPrice": 18
  },
  "6530690f22c7fd9770508545": {
    "median": 4,
    "slug": "masseter_prime_blueprint",
    "volume": 234,
    "waPrice": 4.16
  },
  "6530690f22c7fd9770508547": {
    "median": 4,
    "slug": "masseter_prime_handle",
    "volume": 271,
    "waPrice": 4.16
  },
  "5c182b739603780081b09a55": {
    "median": 8,
    "slug": "mesa_prime_blueprint",
    "volume": 713,
    "waPrice": 8.04
  },
  "5c182b749603780081b09a57": {
    "median": 7,
    "slug": "mesa_prime_chassis_blueprint",
    "volume": 581,
    "waPrice": 7.42
  },
  "5c182b739603780081b09a54": {
    "median": 33,
    "slug": "mesa_prime_neuroptics_blueprint",
    "volume": 624,
    "waPrice": 33.68
  },
  "5c182b749603780081b09a56": {
    "median": 18,
    "slug": "mesa_prime_systems_blueprint",
    "volume": 1813,
    "waPrice": 19.38
  },
  "5a2feeb2c2c9e90cbdaa23d4": {
    "median": 30,
    "slug": "mirage_prime_blueprint",
    "volume": 660,
    "waPrice": 29.8
  },
  "5a2feeb2c2c9e90cbdaa23d5": {
    "median": 10,
    "slug": "mirage_prime_chassis_blueprint",
    "volume": 846,
    "waPrice": 10
  },
  "5a2feeb2c2c9e90cbdaa23d6": {
    "median": 6,
    "slug": "mirage_prime_neuroptics_blueprint",
    "volume": 1175,
    "waPrice": 7.51
  },
  "5a2feeb1c2c9e90cbdaa23d2": {
    "median": 15,
    "slug": "mirage_prime_systems_blueprint",
    "volume": 966,
    "waPrice": 17.48
  },
  "6242037766a58f0108c3d48f": {
    "median": 9,
    "slug": "nagantaka_prime_barrel",
    "volume": 226,
    "waPrice": 8.88
  },
  "6242037666a58f0108c3d482": {
    "median": 16.5,
    "slug": "nagantaka_prime_blueprint",
    "volume": 252,
    "waPrice": 20.13
  },
  "6242037666a58f0108c3d481": {
    "median": 5,
    "slug": "nagantaka_prime_receiver",
    "volume": 195,
    "waPrice": 5.04
  },
  "6242037666a58f0108c3d485": {
    "median": 9,
    "slug": "nagantaka_prime_stock",
    "volume": 204,
    "waPrice": 8.53
  },
  "59a5cd4d5cd9938cfede7041": {
    "median": 35,
    "slug": "nami_skyla_prime_blade",
    "volume": 220,
    "waPrice": 34.91
  },
  "59a5c2565cd9938cfede703f": {
    "median": 10,
    "slug": "nami_skyla_prime_blueprint",
    "volume": 162,
    "waPrice": 9.43
  },
  "59a5cd4d5cd9938cfede7042": {
    "median": 10,
    "slug": "nami_skyla_prime_handle",
    "volume": 480,
    "waPrice": 9.31
  },
  "66c60c9066bbb2aedca695a9": {
    "median": 15,
    "slug": "nautilus_prime_blueprint",
    "volume": 553,
    "waPrice": 15.14
  },
  "66c60c9066bbb2aedca695ab": {
    "median": 8,
    "slug": "nautilus_prime_carapace",
    "volume": 558,
    "waPrice": 7.98
  },
  "66c60c9066bbb2aedca695aa": {
    "median": 27,
    "slug": "nautilus_prime_cerebrum",
    "volume": 451,
    "waPrice": 26.84
  },
  "66c60c9166bbb2aedca695ac": {
    "median": 5,
    "slug": "nautilus_prime_systems",
    "volume": 754,
    "waPrice": 4.47
  },
  "57bcb14ce506eb45ea25145e": {
    "median": 30,
    "slug": "nekros_prime_blueprint",
    "volume": 402,
    "waPrice": 30.07
  },
  "57bc9a40e506eb45ea251452": {
    "median": 10,
    "slug": "nekros_prime_chassis_blueprint",
    "volume": 525,
    "waPrice": 15.41
  },
  "57bc9a40e506eb45ea251453": {
    "median": 30,
    "slug": "nekros_prime_neuroptics_blueprint",
    "volume": 445,
    "waPrice": 30.25
  },
  "57bc9a40e506eb45ea251454": {
    "median": 35,
    "slug": "nekros_prime_systems_blueprint",
    "volume": 837,
    "waPrice": 34.23
  },
  "5f986cf99dbdce024971b0b7": {
    "median": 9,
    "slug": "nezha_prime_blueprint",
    "volume": 544,
    "waPrice": 8.82
  },
  "5f986cfa9dbdce024971b0bf": {
    "median": 30,
    "slug": "nezha_prime_chassis_blueprint",
    "volume": 301,
    "waPrice": 30.56
  },
  "5f986cfb9dbdce024971b0c1": {
    "median": 25,
    "slug": "nezha_prime_neuroptics_blueprint",
    "volume": 802,
    "waPrice": 26.5
  },
  "5f986cfa9dbdce024971b0be": {
    "median": 5,
    "slug": "nezha_prime_systems_blueprint",
    "volume": 708,
    "waPrice": 6.3
  },
  "6139101830dd5b004b7f9093": {
    "median": 10,
    "slug": "nidus_prime_blueprint",
    "volume": 872,
    "waPrice": 17.39
  },
  "6139101a30dd5b004b7f90ad": {
    "median": 35,
    "slug": "nidus_prime_chassis_blueprint",
    "volume": 403,
    "waPrice": 35.87
  },
  "6139101a30dd5b004b7f90ac": {
    "median": 40,
    "slug": "nidus_prime_neuroptics_blueprint",
    "volume": 458,
    "waPrice": 39.19
  },
  "6139101a30dd5b004b7f90a8": {
    "median": 8,
    "slug": "nidus_prime_systems_blueprint",
    "volume": 483,
    "waPrice": 8.08
  },
  "56c3bbf45d2f0202da32e941": {
    "median": 19,
    "slug": "nikana_prime_blade",
    "volume": 419,
    "waPrice": 20.12
  },
  "56c3bbee5d2f0202da32e940": {
    "median": 8,
    "slug": "nikana_prime_blueprint",
    "volume": 426,
    "waPrice": 8.28
  },
  "56c3bbf85d2f0202da32e942": {
    "median": 43,
    "slug": "nikana_prime_hilt",
    "volume": 400,
    "waPrice": 43.73
  },
  "5d21ce42f4604c012d1e0c0c": {
    "median": 6,
    "slug": "ninkondi_prime_blueprint",
    "volume": 247,
    "waPrice": 6.6
  },
  "5d21ce48f4604c012d1e0c16": {
    "median": 5,
    "slug": "ninkondi_prime_chain",
    "volume": 334,
    "waPrice": 5.01
  },
  "5d21ce45f4604c012d1e0c10": {
    "median": 25,
    "slug": "ninkondi_prime_handle",
    "volume": 327,
    "waPrice": 25.95
  },
  "54a73e65e779893a797fff6b": {
    "median": 15,
    "slug": "nova_prime_blueprint",
    "volume": 454,
    "waPrice": 14.59
  },
  "54a73e65e779893a797fff69": {
    "median": 33,
    "slug": "nova_prime_chassis_blueprint",
    "volume": 1852,
    "waPrice": 35.07
  },
  "54a73e65e779893a797fff68": {
    "median": 15,
    "slug": "nova_prime_neuroptics_blueprint",
    "volume": 569,
    "waPrice": 16.29
  },
  "54a73e65e779893a797fff6a": {
    "median": 15,
    "slug": "nova_prime_systems_blueprint",
    "volume": 481,
    "waPrice": 15.58
  },
  "54a73e65e779893a797fff72": {
    "median": 10,
    "slug": "nyx_prime_blueprint",
    "volume": 459,
    "waPrice": 9.66
  },
  "54a73e65e779893a797fff73": {
    "median": 10,
    "slug": "nyx_prime_chassis_blueprint",
    "volume": 1178,
    "waPrice": 9.61
  },
  "54a73e65e779893a797fff71": {
    "median": 30,
    "slug": "nyx_prime_neuroptics_blueprint",
    "volume": 832,
    "waPrice": 32.78
  },
  "54a73e65e779893a797fff76": {
    "median": 10,
    "slug": "nyx_prime_systems_blueprint",
    "volume": 308,
    "waPrice": 9.52
  },
  "592dd262011e88f094afec7d": {
    "median": 10,
    "slug": "oberon_prime_blueprint",
    "volume": 285,
    "waPrice": 9.55
  },
  "592dd262011e88f094afec7f": {
    "median": 11,
    "slug": "oberon_prime_chassis_blueprint",
    "volume": 345,
    "waPrice": 11.79
  },
  "592dd262011e88f094afec7e": {
    "median": 35,
    "slug": "oberon_prime_neuroptics_blueprint",
    "volume": 321,
    "waPrice": 35.85
  },
  "592dd262011e88f094afec80": {
    "median": 20,
    "slug": "oberon_prime_systems_blueprint",
    "volume": 1823,
    "waPrice": 19.61
  },
  "6036214f0a372600fd5614cf": {
    "median": 50,
    "slug": "octavia_prime_blueprint",
    "volume": 632,
    "waPrice": 49.33
  },
  "603621500a372600fd5614d7": {
    "median": 12,
    "slug": "octavia_prime_chassis_blueprint",
    "volume": 381,
    "waPrice": 12.98
  },
  "603621500a372600fd5614d8": {
    "median": 5,
    "slug": "octavia_prime_neuroptics_blueprint",
    "volume": 427,
    "waPrice": 5.71
  },
  "603621500a372600fd5614da": {
    "median": 10,
    "slug": "octavia_prime_systems_blueprint",
    "volume": 393,
    "waPrice": 9.62
  },
  "5527a26de77989205156b2b7": {
    "median": 9,
    "slug": "odonata_prime_blueprint",
    "volume": 479,
    "waPrice": 8.91
  },
  "5527a279e77989205639861f": {
    "median": 10,
    "slug": "odonata_prime_harness_blueprint",
    "volume": 214,
    "waPrice": 9.65
  },
  "5527a288e77989205f31e525": {
    "median": 9,
    "slug": "odonata_prime_systems_blueprint",
    "volume": 471,
    "waPrice": 9.35
  },
  "5527a280e779892059574ca9": {
    "median": 29,
    "slug": "odonata_prime_wings_blueprint",
    "volume": 311,
    "waPrice": 28.92
  },
  "663268d2e85cac3856c86dc1": {
    "median": 9,
    "slug": "okina_prime_blade",
    "volume": 758,
    "waPrice": 9.49
  },
  "663268d0e85cac3856c86dbd": {
    "median": 18,
    "slug": "okina_prime_blueprint",
    "volume": 502,
    "waPrice": 20.38
  },
  "663268d1e85cac3856c86dbf": {
    "median": 8,
    "slug": "okina_prime_handle",
    "volume": 488,
    "waPrice": 8.02
  },
  "54a73e65e779893a797fff50": {
    "median": 4.5,
    "slug": "orthos_prime_blade",
    "volume": 292,
    "waPrice": 4.53
  },
  "54a73e65e779893a797fff51": {
    "median": 4,
    "slug": "orthos_prime_blueprint",
    "volume": 287,
    "waPrice": 3.85
  },
  "54a73e65e779893a797fff52": {
    "median": 3,
    "slug": "orthos_prime_handle",
    "volume": 283,
    "waPrice": 3.15
  },
  "6036214f0a372600fd5614d5": {
    "median": 5,
    "slug": "pandero_prime_barrel",
    "volume": 312,
    "waPrice": 5.96
  },
  "603621500a372600fd5614db": {
    "median": 5,
    "slug": "pandero_prime_blueprint",
    "volume": 152,
    "waPrice": 4.81
  },
  "603621500a372600fd5614d9": {
    "median": 30,
    "slug": "pandero_prime_receiver",
    "volume": 240,
    "waPrice": 29.71
  },
  "5e839494267539077b0dd6ba": {
    "median": 8,
    "slug": "pangolin_prime_blade",
    "volume": 367,
    "waPrice": 8.17
  },
  "5e839494267539077b0dd6a9": {
    "median": 14,
    "slug": "pangolin_prime_blueprint",
    "volume": 233,
    "waPrice": 13.55
  },
  "5e839493267539077b0dd6a4": {
    "median": 8,
    "slug": "pangolin_prime_handle",
    "volume": 252,
    "waPrice": 8.13
  },
  "5f0e0fdd9f527b0285718f1b": {
    "median": 25,
    "slug": "panthera_prime_barrel",
    "volume": 196,
    "waPrice": 27.08
  },
  "5f0e0fdd9f527b0285718f1d": {
    "median": 7,
    "slug": "panthera_prime_blueprint",
    "volume": 224,
    "waPrice": 7.58
  },
  "5f0e0fdd9f527b0285718f1c": {
    "median": 20,
    "slug": "panthera_prime_receiver",
    "volume": 311,
    "waPrice": 19.74
  },
  "5f0e0fdc9f527b0285718f17": {
    "median": 9,
    "slug": "panthera_prime_stock",
    "volume": 241,
    "waPrice": 9.13
  },
  "54a73e65e779893a797fff55": {
    "median": 3.5,
    "slug": "paris_prime_blueprint",
    "volume": 136,
    "waPrice": 3.6
  },
  "54a73e65e779893a797fff53": {
    "median": 3,
    "slug": "paris_prime_grip",
    "volume": 428,
    "waPrice": 3.98
  },
  "54a73e65e779893a797fff54": {
    "median": 2,
    "slug": "paris_prime_lower_limb",
    "volume": 242,
    "waPrice": 2.62
  },
  "54a73e65e779893a797fff56": {
    "median": 3,
    "slug": "paris_prime_string",
    "volume": 302,
    "waPrice": 3.19
  },
  "54a73e65e779893a797fff57": {
    "median": 3,
    "slug": "paris_prime_upper_limb",
    "volume": 236,
    "waPrice": 3.58
  },
  "69d6770bb3984cc97e241754": {
    "median": 20,
    "slug": "perigale_prime_barrel",
    "volume": 290,
    "waPrice": 19.45
  },
  "69d6770ab3984cc97e241753": {
    "median": 3,
    "slug": "perigale_prime_blueprint",
    "volume": 293,
    "waPrice": 3.75
  },
  "69d6770cb3984cc97e241755": {
    "median": 5,
    "slug": "perigale_prime_receiver",
    "volume": 264,
    "waPrice": 4.85
  },
  "69d6770db3984cc97e241756": {
    "median": 3,
    "slug": "perigale_prime_stock",
    "volume": 430,
    "waPrice": 3.6
  },
  "633e2e6bf570d10793afb81b": {
    "median": 20,
    "slug": "phantasma_prime_barrel",
    "volume": 378,
    "waPrice": 21.88
  },
  "633e2e6bf570d10793afb820": {
    "median": 5,
    "slug": "phantasma_prime_blueprint",
    "volume": 455,
    "waPrice": 5.62
  },
  "633e2e6cf570d10793afb824": {
    "median": 7,
    "slug": "phantasma_prime_receiver",
    "volume": 433,
    "waPrice": 7.83
  },
  "633e2e6cf570d10793afb82a": {
    "median": 18,
    "slug": "phantasma_prime_stock",
    "volume": 437,
    "waPrice": 19.32
  },
  "66325caae85cac3856c86cbe": {
    "median": 4,
    "slug": "protea_prime_blueprint",
    "volume": 494,
    "waPrice": 4.15
  },
  "66325cb5e85cac3856c86cc2": {
    "median": 18,
    "slug": "protea_prime_chassis_blueprint",
    "volume": 451,
    "waPrice": 18.82
  },
  "66325cb1e85cac3856c86cc0": {
    "median": 5,
    "slug": "protea_prime_neuroptics_blueprint",
    "volume": 565,
    "waPrice": 4.59
  },
  "66325cb9e85cac3856c86cc4": {
    "median": 15,
    "slug": "protea_prime_systems_blueprint",
    "volume": 533,
    "waPrice": 16.17
  },
  "5b2985e1eb069f04ea65b0f3": {
    "median": 7,
    "slug": "pyrana_prime_barrel",
    "volume": 361,
    "waPrice": 8.19
  },
  "5b2985e1eb069f04ea65b0ea": {
    "median": 44,
    "slug": "pyrana_prime_blueprint",
    "volume": 275,
    "waPrice": 44.02
  },
  "5b2985e1eb069f04ea65b0ee": {
    "median": 10,
    "slug": "pyrana_prime_receiver",
    "volume": 465,
    "waPrice": 10.27
  },
  "673516e0db3ac2cfade14a7f": {
    "median": 10,
    "slug": "quassus_prime_blade",
    "volume": 383,
    "waPrice": 10.74
  },
  "673516dedb3ac2cfade14a7d": {
    "median": 3,
    "slug": "quassus_prime_blueprint",
    "volume": 304,
    "waPrice": 3.66
  },
  "673516dfdb3ac2cfade14a7e": {
    "median": 4,
    "slug": "quassus_prime_handle",
    "volume": 310,
    "waPrice": 4.36
  },
  "54a73e65e779893a797fff58": {
    "median": 10,
    "slug": "reaper_prime_blade",
    "volume": 261,
    "waPrice": 11.05
  },
  "54a73e65e779893a797fff59": {
    "median": 10,
    "slug": "reaper_prime_blueprint",
    "volume": 211,
    "waPrice": 9.7
  },
  "54a73e65e779893a797fff5a": {
    "median": 15,
    "slug": "reaper_prime_handle",
    "volume": 299,
    "waPrice": 14.84
  },
  "5c196fad96037800ddadac14": {
    "median": 7,
    "slug": "redeemer_prime_blade",
    "volume": 286,
    "waPrice": 7.51
  },
  "5c196fae96037800ddadac16": {
    "median": 5,
    "slug": "redeemer_prime_blueprint",
    "volume": 182,
    "waPrice": 4.85
  },
  "5c196fb096037800ddadac19": {
    "median": 40,
    "slug": "redeemer_prime_handle",
    "volume": 186,
    "waPrice": 39.96
  },
  "633e2e6cf570d10793afb827": {
    "median": 25,
    "slug": "revenant_prime_blueprint",
    "volume": 788,
    "waPrice": 28.3
  },
  "633e2e6af570d10793afb815": {
    "median": 9,
    "slug": "revenant_prime_chassis_blueprint",
    "volume": 640,
    "waPrice": 8.9
  },
  "633e2e6bf570d10793afb81d": {
    "median": 9,
    "slug": "revenant_prime_neuroptics_blueprint",
    "volume": 757,
    "waPrice": 8.84
  },
  "633e2e6af570d10793afb816": {
    "median": 10,
    "slug": "revenant_prime_systems_blueprint",
    "volume": 674,
    "waPrice": 9.49
  },
  "54a73e65e779893a797fff77": {
    "median": 24,
    "slug": "rhino_prime_blueprint",
    "volume": 700,
    "waPrice": 24.65
  },
  "54a73e65e779893a797fff78": {
    "median": 10,
    "slug": "rhino_prime_chassis_blueprint",
    "volume": 476,
    "waPrice": 9.84
  },
  "54a73e65e779893a797fff6f": {
    "median": 15,
    "slug": "rhino_prime_neuroptics_blueprint",
    "volume": 441,
    "waPrice": 18.52
  },
  "54a73e65e779893a797fff7f": {
    "median": 10,
    "slug": "rhino_prime_systems_blueprint",
    "volume": 484,
    "waPrice": 9.57
  },
  "5baa8bbf4567de01ac283493": {
    "median": 9,
    "slug": "rubico_prime_barrel",
    "volume": 291,
    "waPrice": 8.61
  },
  "5baa8bbf4567de01ac283499": {
    "median": 24,
    "slug": "rubico_prime_blueprint",
    "volume": 228,
    "waPrice": 23.75
  },
  "5baa8bbf4567de01ac283494": {
    "median": 5,
    "slug": "rubico_prime_receiver",
    "volume": 277,
    "waPrice": 4.86
  },
  "5baa8bbf4567de01ac283498": {
    "median": 9,
    "slug": "rubico_prime_stock",
    "volume": 403,
    "waPrice": 9.23
  },
  "69d67751b3984cc97e24175a": {
    "median": 10,
    "slug": "sarofang_prime_blade",
    "volume": 493,
    "waPrice": 10.71
  },
  "69d67750b3984cc97e241759": {
    "median": 4,
    "slug": "sarofang_prime_blueprint",
    "volume": 278,
    "waPrice": 3.95
  },
  "69d67752b3984cc97e24175b": {
    "median": 5,
    "slug": "sarofang_prime_handle",
    "volume": 311,
    "waPrice": 4.53
  },
  "56c3bbd55d2f0202da32e93b": {
    "median": 20,
    "slug": "saryn_prime_blueprint",
    "volume": 846,
    "waPrice": 20.32
  },
  "56c3bbe45d2f0202da32e93e": {
    "median": 45,
    "slug": "saryn_prime_chassis_blueprint",
    "volume": 794,
    "waPrice": 44.55
  },
  "56c3bbdb5d2f0202da32e93c": {
    "median": 10,
    "slug": "saryn_prime_neuroptics_blueprint",
    "volume": 332,
    "waPrice": 10.44
  },
  "56c3bbe05d2f0202da32e93d": {
    "median": 9,
    "slug": "saryn_prime_systems_blueprint",
    "volume": 741,
    "waPrice": 9.04
  },
  "54a73e65e779893a797fff5b": {
    "median": 18,
    "slug": "scindo_prime_blade",
    "volume": 466,
    "waPrice": 17.61
  },
  "54a73e65e779893a797fff5c": {
    "median": 5,
    "slug": "scindo_prime_blueprint",
    "volume": 218,
    "waPrice": 6.29
  },
  "54a73e65e779893a797fff5d": {
    "median": 10,
    "slug": "scindo_prime_handle",
    "volume": 247,
    "waPrice": 9.55
  },
  "61bb64fd3132ff00482b5fc5": {
    "median": 39,
    "slug": "scourge_prime_barrel",
    "volume": 248,
    "waPrice": 39.25
  },
  "61bb64fb3132ff00482b5fb8": {
    "median": 5,
    "slug": "scourge_prime_blade",
    "volume": 236,
    "waPrice": 6.82
  },
  "61bb64fe3132ff00482b5fd6": {
    "median": 19,
    "slug": "scourge_prime_blueprint",
    "volume": 210,
    "waPrice": 19.39
  },
  "61bb64fe3132ff00482b5fd4": {
    "median": 7,
    "slug": "scourge_prime_handle",
    "volume": 286,
    "waPrice": 7.68
  },
  "66c6080266bbb2aedca6957c": {
    "median": 6,
    "slug": "sevagoth_prime_blueprint",
    "volume": 577,
    "waPrice": 7.15
  },
  "66c6080366bbb2aedca6957e": {
    "median": 30,
    "slug": "sevagoth_prime_chassis_blueprint",
    "volume": 863,
    "waPrice": 33.42
  },
  "66c6080366bbb2aedca6957d": {
    "median": 3,
    "slug": "sevagoth_prime_neuroptics_blueprint",
    "volume": 577,
    "waPrice": 3.74
  },
  "66c6080366bbb2aedca6957f": {
    "median": 4,
    "slug": "sevagoth_prime_systems_blueprint",
    "volume": 428,
    "waPrice": 4.39
  },
  "641263e07d179f02100c6d42": {
    "median": 7,
    "slug": "shade_prime_blueprint",
    "volume": 452,
    "waPrice": 7.74
  },
  "641263e07d179f02100c6d4d": {
    "median": 35,
    "slug": "shade_prime_carapace",
    "volume": 428,
    "waPrice": 35.62
  },
  "641263e07d179f02100c6d48": {
    "median": 8,
    "slug": "shade_prime_cerebrum",
    "volume": 335,
    "waPrice": 8.37
  },
  "641263e07d179f02100c6d44": {
    "median": 5,
    "slug": "shade_prime_systems",
    "volume": 319,
    "waPrice": 5.21
  },
  "54a73e65e779893a797fff5e": {
    "median": 12,
    "slug": "sicarus_prime_barrel",
    "volume": 354,
    "waPrice": 12.91
  },
  "54a73e65e779893a797fff5f": {
    "median": 10,
    "slug": "sicarus_prime_blueprint",
    "volume": 305,
    "waPrice": 9.75
  },
  "54a73e65e779893a797fff60": {
    "median": 40,
    "slug": "sicarus_prime_receiver",
    "volume": 290,
    "waPrice": 41.29
  },
  "592dd262011e88f094afec8a": {
    "median": 10,
    "slug": "silva_and_aegis_prime_blade",
    "volume": 275,
    "waPrice": 9.44
  },
  "592dd262011e88f094afec87": {
    "median": 10,
    "slug": "silva_and_aegis_prime_blueprint",
    "volume": 223,
    "waPrice": 9.63
  },
  "592dd262011e88f094afec88": {
    "median": 25,
    "slug": "silva_and_aegis_prime_guard",
    "volume": 257,
    "waPrice": 25.36
  },
  "592dd262011e88f094afec89": {
    "median": 7,
    "slug": "silva_and_aegis_prime_hilt",
    "volume": 346,
    "waPrice": 8.05
  },
  "54a73e65e779893a797fff61": {
    "median": 11.5,
    "slug": "soma_prime_barrel",
    "volume": 320,
    "waPrice": 13.11
  },
  "54a73e65e779893a797fff62": {
    "median": 8,
    "slug": "soma_prime_blueprint",
    "volume": 410,
    "waPrice": 8.04
  },
  "54a73e65e779893a797fff63": {
    "median": 10,
    "slug": "soma_prime_receiver",
    "volume": 685,
    "waPrice": 9.67
  },
  "54a73e65e779893a797fff64": {
    "median": 27,
    "slug": "soma_prime_stock",
    "volume": 444,
    "waPrice": 30.98
  },
  "56c3bc0c5d2f0202da32e945": {
    "median": 20,
    "slug": "spira_prime_blade",
    "volume": 653,
    "waPrice": 20.81
  },
  "56c3bc025d2f0202da32e944": {
    "median": 5,
    "slug": "spira_prime_blueprint",
    "volume": 210,
    "waPrice": 5.18
  },
  "56c3bc115d2f0202da32e946": {
    "median": 40,
    "slug": "spira_prime_pouch",
    "volume": 246,
    "waPrice": 41.16
  },
  "6ab3f233626e0c6df7f6c9b6": {
    "median": 30,
    "slug": "steflos_prime_barrel",
    "volume": 259,
    "waPrice": 30.08
  },
  "6ab3f230626e0c6df7f6c9b4": {
    "median": 10,
    "slug": "steflos_prime_blueprint",
    "volume": 219,
    "waPrice": 9.55
  },
  "6ab3f232626e0c6df7f6c9b5": {
    "median": 8,
    "slug": "steflos_prime_receiver",
    "volume": 251,
    "waPrice": 8.58
  },
  "6ab3f235626e0c6df7f6c9b7": {
    "median": 10,
    "slug": "steflos_prime_stock",
    "volume": 214,
    "waPrice": 9.64
  },
  "5ca2866ffc2db2035eae059b": {
    "median": 5,
    "slug": "stradavar_prime_barrel",
    "volume": 388,
    "waPrice": 6.16
  },
  "5ca28670fc2db2035eae05a7": {
    "median": 14,
    "slug": "stradavar_prime_blueprint",
    "volume": 230,
    "waPrice": 14.39
  },
  "5ca28670fc2db2035eae05a3": {
    "median": 6,
    "slug": "stradavar_prime_receiver",
    "volume": 381,
    "waPrice": 7.02
  },
  "5ca28670fc2db2035eae05a4": {
    "median": 10,
    "slug": "stradavar_prime_stock",
    "volume": 224,
    "waPrice": 9.68
  },
  "6139101a30dd5b004b7f90a7": {
    "median": 10,
    "slug": "strun_prime_barrel",
    "volume": 356,
    "waPrice": 10.9
  },
  "6139101930dd5b004b7f909f": {
    "median": 33,
    "slug": "strun_prime_blueprint",
    "volume": 317,
    "waPrice": 35.99
  },
  "6139101a30dd5b004b7f90a4": {
    "median": 8,
    "slug": "strun_prime_receiver",
    "volume": 381,
    "waPrice": 8.65
  },
  "6139101a30dd5b004b7f90a9": {
    "median": 10,
    "slug": "strun_prime_stock",
    "volume": 248,
    "waPrice": 9.66
  },
  "6a330f3e58b60af8cd1a0d08": {
    "median": 9,
    "slug": "styanax_prime_blueprint",
    "volume": 839,
    "waPrice": 9.45
  },
  "6a330f4158b60af8cd1a0d0a": {
    "median": 5,
    "slug": "styanax_prime_chassis_blueprint",
    "volume": 402,
    "waPrice": 5.05
  },
  "6a330f3f58b60af8cd1a0d09": {
    "median": 15,
    "slug": "styanax_prime_neuroptics_blueprint",
    "volume": 557,
    "waPrice": 16.18
  },
  "6a330f4258b60af8cd1a0d0b": {
    "median": 5,
    "slug": "styanax_prime_systems_blueprint",
    "volume": 441,
    "waPrice": 5.76
  },
  "592dd262011e88f094afec85": {
    "median": 39,
    "slug": "sybaris_prime_barrel",
    "volume": 242,
    "waPrice": 39.52
  },
  "592dd262011e88f094afec82": {
    "median": 9,
    "slug": "sybaris_prime_blueprint",
    "volume": 210,
    "waPrice": 8.79
  },
  "592dd262011e88f094afec84": {
    "median": 10,
    "slug": "sybaris_prime_receiver",
    "volume": 195,
    "waPrice": 9.55
  },
  "592dd262011e88f094afec83": {
    "median": 11,
    "slug": "sybaris_prime_stock",
    "volume": 192,
    "waPrice": 12.22
  },
  "633e2e6af570d10793afb812": {
    "median": 5,
    "slug": "tatsu_prime_blade",
    "volume": 349,
    "waPrice": 5.74
  },
  "633e2e6af570d10793afb818": {
    "median": 5,
    "slug": "tatsu_prime_blueprint",
    "volume": 271,
    "waPrice": 4.87
  },
  "633e2e6bf570d10793afb81e": {
    "median": 19,
    "slug": "tatsu_prime_handle",
    "volume": 315,
    "waPrice": 19.36
  },
  "5d93ca117ea27b0a87566f79": {
    "median": 25,
    "slug": "tekko_prime_blade",
    "volume": 260,
    "waPrice": 26.82
  },
  "5d93ca127ea27b0a87566f7c": {
    "median": 5,
    "slug": "tekko_prime_blueprint",
    "volume": 270,
    "waPrice": 4.8
  },
  "5d93ca117ea27b0a87566f65": {
    "median": 9,
    "slug": "tekko_prime_gauntlet",
    "volume": 328,
    "waPrice": 8.93
  },
  "603621500a372600fd5614d6": {
    "median": 19,
    "slug": "tenora_prime_barrel",
    "volume": 258,
    "waPrice": 19.69
  },
  "6036214f0a372600fd5614d0": {
    "median": 5,
    "slug": "tenora_prime_blueprint",
    "volume": 148,
    "waPrice": 4.93
  },
  "6036214f0a372600fd5614d1": {
    "median": 30,
    "slug": "tenora_prime_receiver",
    "volume": 286,
    "waPrice": 29.54
  },
  "6036214f0a372600fd5614d3": {
    "median": 11,
    "slug": "tenora_prime_stock",
    "volume": 222,
    "waPrice": 11.6
  },
  "5ab167b7b2b6a80475780fb1": {
    "median": 16,
    "slug": "tiberon_prime_barrel",
    "volume": 252,
    "waPrice": 17.34
  },
  "5ab167b7b2b6a80475780fab": {
    "median": 5,
    "slug": "tiberon_prime_blueprint",
    "volume": 202,
    "waPrice": 6.47
  },
  "5ab167b8b2b6a80475780fc6": {
    "median": 10,
    "slug": "tiberon_prime_receiver",
    "volume": 243,
    "waPrice": 9.5
  },
  "5ab167b8b2b6a80475780fb8": {
    "median": 30,
    "slug": "tiberon_prime_stock",
    "volume": 205,
    "waPrice": 30.06
  },
  "57bc9c84e506eb45ea251457": {
    "median": 7,
    "slug": "tigris_prime_barrel",
    "volume": 273,
    "waPrice": 7.1
  },
  "57bc9c84e506eb45ea251459": {
    "median": 30,
    "slug": "tigris_prime_blueprint",
    "volume": 206,
    "waPrice": 30.47
  },
  "57bc9c84e506eb45ea251458": {
    "median": 11,
    "slug": "tigris_prime_receiver",
    "volume": 279,
    "waPrice": 12.95
  },
  "57bc9c84e506eb45ea251456": {
    "median": 8,
    "slug": "tigris_prime_stock",
    "volume": 309,
    "waPrice": 8.01
  },
  "5ca28670fc2db2035eae059f": {
    "median": 5,
    "slug": "tipedo_prime_blueprint",
    "volume": 217,
    "waPrice": 5.19
  },
  "5ca2866ffc2db2035eae059a": {
    "median": 30,
    "slug": "tipedo_prime_handle",
    "volume": 202,
    "waPrice": 30.86
  },
  "5ca28670fc2db2035eae059d": {
    "median": 12,
    "slug": "tipedo_prime_ornament",
    "volume": 399,
    "waPrice": 13.55
  },
  "5e839495267539077b0dd6cc": {
    "median": 11,
    "slug": "titania_prime_blueprint",
    "volume": 535,
    "waPrice": 12.1
  },
  "5e839493267539077b0dd698": {
    "median": 10,
    "slug": "titania_prime_chassis_blueprint",
    "volume": 1150,
    "waPrice": 13.17
  },
  "5e839494267539077b0dd6b8": {
    "median": 10,
    "slug": "titania_prime_neuroptics_blueprint",
    "volume": 551,
    "waPrice": 9.67
  },
  "5e839494267539077b0dd6b0": {
    "median": 39,
    "slug": "titania_prime_systems_blueprint",
    "volume": 1566,
    "waPrice": 38.95
  },
  "56153689b66f836f7a3c0baf": {
    "median": 16,
    "slug": "trinity_prime_blueprint",
    "volume": 285,
    "waPrice": 17.33
  },
  "5615369ab66f836f805c5a8b": {
    "median": 10,
    "slug": "trinity_prime_chassis_blueprint",
    "volume": 291,
    "waPrice": 10.07
  },
  "56153692b66f836f7d649936": {
    "median": 12,
    "slug": "trinity_prime_neuroptics_blueprint",
    "volume": 325,
    "waPrice": 13.25
  },
  "561536a1b66f836f854b966a": {
    "median": 10,
    "slug": "trinity_prime_systems_blueprint",
    "volume": 839,
    "waPrice": 9.66
  },
  "673516c7db3ac2cfade14a78": {
    "median": 10,
    "slug": "trumna_prime_barrel",
    "volume": 365,
    "waPrice": 9.36
  },
  "673516c6db3ac2cfade14a77": {
    "median": 2,
    "slug": "trumna_prime_blueprint",
    "volume": 264,
    "waPrice": 1.96
  },
  "673516c8db3ac2cfade14a79": {
    "median": 11,
    "slug": "trumna_prime_receiver",
    "volume": 359,
    "waPrice": 12.6
  },
  "673516c9db3ac2cfade14a7a": {
    "median": 5,
    "slug": "trumna_prime_stock",
    "volume": 388,
    "waPrice": 4.52
  },
  "68add07d731e63abe79a5d17": {
    "median": 4,
    "slug": "vadarya_prime_barrel",
    "volume": 419,
    "waPrice": 4.07
  },
  "68add07d731e63abe79a5d16": {
    "median": 9,
    "slug": "vadarya_prime_blueprint",
    "volume": 261,
    "waPrice": 8.98
  },
  "68add07d731e63abe79a5d18": {
    "median": 3,
    "slug": "vadarya_prime_receiver",
    "volume": 479,
    "waPrice": 3.74
  },
  "68add07d731e63abe79a5d19": {
    "median": 3,
    "slug": "vadarya_prime_stock",
    "volume": 233,
    "waPrice": 3.73
  },
  "583589fd2c2ada0047b386f6": {
    "median": 8,
    "slug": "valkyr_prime_blueprint",
    "volume": 409,
    "waPrice": 8.1
  },
  "58358a092c2ada0047b386f8": {
    "median": 35,
    "slug": "valkyr_prime_chassis_blueprint",
    "volume": 1134,
    "waPrice": 36.74
  },
  "58358a062c2ada0047b386f7": {
    "median": 10,
    "slug": "valkyr_prime_neuroptics_blueprint",
    "volume": 467,
    "waPrice": 11.88
  },
  "58358a0c2c2ada0047b386f9": {
    "median": 18,
    "slug": "valkyr_prime_systems_blueprint",
    "volume": 1866,
    "waPrice": 17.47
  },
  "54a73e65e779893a797fff65": {
    "median": 10,
    "slug": "vasto_prime_barrel",
    "volume": 317,
    "waPrice": 10.05
  },
  "54a73e65e779893a797fff66": {
    "median": 8,
    "slug": "vasto_prime_blueprint",
    "volume": 301,
    "waPrice": 7.76
  },
  "54a73e65e779893a797fff67": {
    "median": 9,
    "slug": "vasto_prime_receiver",
    "volume": 354,
    "waPrice": 8.92
  },
  "573b7fbd0ec44a47787a690d": {
    "median": 19,
    "slug": "vauban_prime_blueprint",
    "volume": 489,
    "waPrice": 19.65
  },
  "573b7fc20ec44a47787a690e": {
    "median": 25,
    "slug": "vauban_prime_chassis_blueprint",
    "volume": 629,
    "waPrice": 25.88
  },
  "573b7fc80ec44a47787a690f": {
    "median": 35,
    "slug": "vauban_prime_neuroptics_blueprint",
    "volume": 402,
    "waPrice": 34.94
  },
  "573d0efa336297b2dfca2909": {
    "median": 40,
    "slug": "vauban_prime_systems_blueprint",
    "volume": 421,
    "waPrice": 42.22
  },
  "559daae0e779897b5273b716": {
    "median": 25,
    "slug": "vectis_prime_barrel",
    "volume": 558,
    "waPrice": 26.72
  },
  "559daae8e779897b56bee133": {
    "median": 10,
    "slug": "vectis_prime_blueprint",
    "volume": 214,
    "waPrice": 9.78
  },
  "559daaefe779897b5a2d3551": {
    "median": 60,
    "slug": "vectis_prime_receiver",
    "volume": 233,
    "waPrice": 60.24
  },
  "559daaf7e779897b5f3f5480": {
    "median": 29,
    "slug": "vectis_prime_stock",
    "volume": 583,
    "waPrice": 32.59
  },
  "663267c5e85cac3856c86db7": {
    "median": 14,
    "slug": "velox_prime_barrel",
    "volume": 372,
    "waPrice": 14.78
  },
  "663267c4e85cac3856c86db5": {
    "median": 4,
    "slug": "velox_prime_blueprint",
    "volume": 239,
    "waPrice": 3.85
  },
  "663267c6e85cac3856c86db9": {
    "median": 5,
    "slug": "velox_prime_receiver",
    "volume": 205,
    "waPrice": 4.99
  },
  "68add0fa731e63abe79a5d1d": {
    "median": 9,
    "slug": "venato_prime_blade",
    "volume": 246,
    "waPrice": 9.31
  },
  "68add0fa731e63abe79a5d1c": {
    "median": 3,
    "slug": "venato_prime_blueprint",
    "volume": 277,
    "waPrice": 3.86
  },
  "68add0fa731e63abe79a5d1e": {
    "median": 4,
    "slug": "venato_prime_handle",
    "volume": 301,
    "waPrice": 3.68
  },
  "58358e1c2c2ada00655a4ef6": {
    "median": 8.5,
    "slug": "venka_prime_blades",
    "volume": 298,
    "waPrice": 8.71
  },
  "58358e192c2ada00655a4ef4": {
    "median": 5,
    "slug": "venka_prime_blueprint",
    "volume": 240,
    "waPrice": 5.16
  },
  "58358e1b2c2ada00655a4ef5": {
    "median": 25,
    "slug": "venka_prime_gauntlet",
    "volume": 573,
    "waPrice": 25.02
  },
  "60ad4a1cf1904300d012c70c": {
    "median": 5,
    "slug": "volnus_prime_blueprint",
    "volume": 258,
    "waPrice": 4.77
  },
  "60ad4a1bf1904300d012c6f9": {
    "median": 20,
    "slug": "volnus_prime_handle",
    "volume": 233,
    "waPrice": 20.45
  },
  "60ad4a1bf1904300d012c6fa": {
    "median": 7,
    "slug": "volnus_prime_head",
    "volume": 331,
    "waPrice": 7.65
  },
  "55244820e779890907ef6805": {
    "median": 15,
    "slug": "volt_prime_blueprint",
    "volume": 765,
    "waPrice": 15.93
  },
  "55158cd9e7798915ee6bd13f": {
    "median": 13,
    "slug": "volt_prime_chassis_blueprint",
    "volume": 622,
    "waPrice": 13.03
  },
  "55158cd0e7798915e9d64c1e": {
    "median": 30,
    "slug": "volt_prime_neuroptics_blueprint",
    "volume": 602,
    "waPrice": 32.49
  },
  "55158ce0e7798915f4c95b78": {
    "median": 10,
    "slug": "volt_prime_systems_blueprint",
    "volume": 497,
    "waPrice": 10.11
  },
  "69d6766fb3984cc97e24174d": {
    "median": 22,
    "slug": "voruna_prime_blueprint",
    "volume": 813,
    "waPrice": 23.32
  },
  "69d67673b3984cc97e24174f": {
    "median": 10,
    "slug": "voruna_prime_chassis_blueprint",
    "volume": 464,
    "waPrice": 9.49
  },
  "69d67671b3984cc97e24174e": {
    "median": 3,
    "slug": "voruna_prime_neuroptics_blueprint",
    "volume": 942,
    "waPrice": 3.99
  },
  "69d67675b3984cc97e241750": {
    "median": 10,
    "slug": "voruna_prime_systems_blueprint",
    "volume": 550,
    "waPrice": 9.61
  },
  "64c2aa1666456704eba6ba4a": {
    "median": 39,
    "slug": "wisp_prime_blueprint",
    "volume": 540,
    "waPrice": 38.37
  },
  "64c2aa1466456704eba6ba2d": {
    "median": 20,
    "slug": "wisp_prime_chassis_blueprint",
    "volume": 2184,
    "waPrice": 19.55
  },
  "64c2aa1566456704eba6ba38": {
    "median": 7,
    "slug": "wisp_prime_neuroptics_blueprint",
    "volume": 1084,
    "waPrice": 8.27
  },
  "64c2aa1666456704eba6ba44": {
    "median": 8,
    "slug": "wisp_prime_systems_blueprint",
    "volume": 625,
    "waPrice": 7.86
  },
  "5d21ce46f4604c012d1e0c12": {
    "median": 35,
    "slug": "wukong_prime_blueprint",
    "volume": 2454,
    "waPrice": 36.11
  },
  "5d21ce45f4604c012d1e0c0f": {
    "median": 13,
    "slug": "wukong_prime_chassis_blueprint",
    "volume": 548,
    "waPrice": 13.23
  },
  "5d21ce4af4604c012d1e0c1a": {
    "median": 10,
    "slug": "wukong_prime_neuroptics_blueprint",
    "volume": 548,
    "waPrice": 9.49
  },
  "5d21ce46f4604c012d1e0c13": {
    "median": 15,
    "slug": "wukong_prime_systems_blueprint",
    "volume": 543,
    "waPrice": 15.77
  },
  "54ca431ce779891a1adb4901": {
    "median": 15,
    "slug": "wyrm_prime_blueprint",
    "volume": 213,
    "waPrice": 14.7
  },
  "54ca4330e779891a286a5428": {
    "median": 15,
    "slug": "wyrm_prime_carapace",
    "volume": 1781,
    "waPrice": 13.83
  },
  "54ca4329e779891a21d036bd": {
    "median": 23,
    "slug": "wyrm_prime_cerebrum",
    "volume": 973,
    "waPrice": 26.37
  },
  "54ca4337e779891a2e3fbc83": {
    "median": 40,
    "slug": "wyrm_prime_systems",
    "volume": 1073,
    "waPrice": 40.7
  },
  "673516aadb3ac2cfade14a71": {
    "median": 15,
    "slug": "xaku_prime_blueprint",
    "volume": 472,
    "waPrice": 15.26
  },
  "673516acdb3ac2cfade14a73": {
    "median": 4,
    "slug": "xaku_prime_chassis_blueprint",
    "volume": 480,
    "waPrice": 4.58
  },
  "673516abdb3ac2cfade14a72": {
    "median": 4,
    "slug": "xaku_prime_neuroptics_blueprint",
    "volume": 414,
    "waPrice": 4.46
  },
  "673516addb3ac2cfade14a74": {
    "median": 5,
    "slug": "xaku_prime_systems_blueprint",
    "volume": 692,
    "waPrice": 4.59
  },
  "682dfa9835715d4f3e9c64e7": {
    "median": 4,
    "slug": "yareli_prime_blueprint",
    "volume": 590,
    "waPrice": 3.97
  },
  "682dfa9835715d4f3e9c64e9": {
    "median": 2,
    "slug": "yareli_prime_chassis_blueprint",
    "volume": 438,
    "waPrice": 2.26
  },
  "682dfa9835715d4f3e9c64e8": {
    "median": 10,
    "slug": "yareli_prime_neuroptics_blueprint",
    "volume": 433,
    "waPrice": 9.91
  },
  "682dfa9835715d4f3e9c64ea": {
    "median": 15,
    "slug": "yareli_prime_systems_blueprint",
    "volume": 751,
    "waPrice": 15.57
  },
  "5f986cf99dbdce024971b0bd": {
    "median": 5,
    "slug": "zakti_prime_barrel",
    "volume": 209,
    "waPrice": 5.94
  },
  "5f986cf99dbdce024971b0b9": {
    "median": 30,
    "slug": "zakti_prime_blueprint",
    "volume": 142,
    "waPrice": 29.97
  },
  "5f986cfb9dbdce024971b0c0": {
    "median": 7,
    "slug": "zakti_prime_receiver",
    "volume": 231,
    "waPrice": 7.18
  },
  "5ab1570db2b6a8044d5137c2": {
    "median": 20,
    "slug": "zephyr_prime_blueprint",
    "volume": 377,
    "waPrice": 19.71
  },
  "5ab1570db2b6a8044d5137c3": {
    "median": 8,
    "slug": "zephyr_prime_chassis_blueprint",
    "volume": 449,
    "waPrice": 7.79
  },
  "5ab1570db2b6a8044d5137c1": {
    "median": 7,
    "slug": "zephyr_prime_neuroptics_blueprint",
    "volume": 475,
    "waPrice": 7.14
  },
  "5ab1570db2b6a8044d5137c4": {
    "median": 40,
    "slug": "zephyr_prime_systems_blueprint",
    "volume": 298,
    "waPrice": 41
  },
  "5d21ce43f4604c012d1e0c0d": {
    "median": 17,
    "slug": "zhuge_prime_barrel",
    "volume": 369,
    "waPrice": 17.93
  },
  "5d21ce47f4604c012d1e0c15": {
    "median": 6,
    "slug": "zhuge_prime_blueprint",
    "volume": 260,
    "waPrice": 6.85
  },
  "5d21ce43f4604c012d1e0c0e": {
    "median": 7,
    "slug": "zhuge_prime_grip",
    "volume": 247,
    "waPrice": 7.41
  },
  "5d21ce48f4604c012d1e0c17": {
    "median": 8,
    "slug": "zhuge_prime_receiver",
    "volume": 758,
    "waPrice": 8.23
  },
  "5d21ce47f4604c012d1e0c14": {
    "median": 10,
    "slug": "zhuge_prime_string",
    "volume": 248,
    "waPrice": 10.93
  },
  "6530694722c7fd977050854a": {
    "median": 5,
    "slug": "zylok_prime_barrel",
    "volume": 205,
    "waPrice": 5.66
  },
  "6530694622c7fd9770508549": {
    "median": 13,
    "slug": "zylok_prime_blueprint",
    "volume": 238,
    "waPrice": 13.43
  },
  "6530694722c7fd977050854b": {
    "median": 5,
    "slug": "zylok_prime_receiver",
    "volume": 292,
    "waPrice": 4.6
  }
}

/** ISO timestamp of the last market data regeneration (build wall-clock). */
export const MARKET_GENERATED_AT = "2026-10-03T18:53:41.559Z"

/**
 * Fodder reference rate `R`: nearest-rank p90 of ducats / waPrice over
 * relic-reward items with volume >= 5, in ducats per platinum (2 dp). An
 * item's d/p above this means its market price is poor relative to its
 * ducat value — burn instead of sell. `null` when the qualifying pool is
 * empty (degraded feed); suppresses all verdicts.
 */
export const MARKET_FODDER_RATE: number | null = 8.98
