import { Context, Telegraf } from "telegraf";
import { Message, MessageEntity, Update } from "telegraf/typings/core/types/typegram";

export interface BotConfigurationProps {
    bot: Telegraf
}

type TextMessage = Update.New & Update.NonChannel & Message.TextMessage;

class Sticker {
    static stickers = [
        "CAACAgEAAxkBAAEbUD1jpqvyLG1YMX9CYIrhnSc-wdGzsgACBAoAAr-MkATuXyl-95FkbiwE",
        "CAACAgEAAxkBAAEbUGJjpqvy3DbN8z69OTi4ilvnKZUnHAAC6gIAAhdgmCFRmRQfnGsjniwE",
        "CAACAgEAAxkBAAEbUHNjpqvyDo0vAqPyVw_5RnFW9vqi8QAC-wkAAr-MkAQMJ3Ulkwaw7iwE",
        "CAACAgEAAxkBAAEbUTVjpq8FyC0BiD1C84H3HokyW_nQ8gAC-wkAAr-MkAQMJ3Ulkwaw7iwE",
        "CAACAgIAAxkBAAEbML5jogwTD_dqUTOKCo-xfHHeiUBnGAACixMAAujW4hK2pl1xiC_YGSwE",
        "CAACAgIAAxkBAAEbMPhjohGxrLGzUCz8sGEt5SyHGmqiYgACNBMAAujW4hIr3wWuzzmXviwE",
        "CAACAgIAAxkBAAEbMQRjohIa0h_py7TWRYkPczgbW44MAwACdRYAAujW4hJwCEKCA-P6zSwE",
        "CAACAgIAAxkBAAEbMQZjohI24Tg6bwGL1xNpSUXL9ZWXPQACfRYAAujW4hI4m7OBrJoxoSwE",
        "CAACAgIAAxkBAAEbMQpjohJWvBlf_JaxaVd6uewAAfmZ2IUAAhMVAALo1uISB5CvQdrJChksBA",
        "CAACAgIAAxkBAAEbMY1joikY_eH9cjAUlqKTjYj78uDfNwACdBYAAujW4hJZMBCwbnFhlywE",
        "CAACAgIAAxkBAAEbMYdjoikHj6u81ERMl3kfDO6jt5DelgACEhUAAujW4hJOATSdWx1yKCwE",
        "CAACAgIAAxkBAAEbMYljoikV7_NsqMhNrchcBltzCfSU1AACchYAAujW4hLxksS4yRHIXiwE",
        "CAACAgIAAxkBAAEbMZ1joilVVUaafxmS5ZVGNEFKboQo2QACCwADRtjpBez-BZVi3uPBLAQ",
        "CAACAgIAAxkBAAEbMZ9joilXbKlU0nq8H1ECMiGZTv-OiAACDQADRtjpBRawmOsBNsdJLAQ",
        "CAACAgIAAxkBAAEbMZFjoikfHpMLYjGWb0nqVNgAAeN9OPYAAoEWAALo1uIS0sjg0Hzg-GEsBA",
        "CAACAgIAAxkBAAEbMZNjoiklSU0aEKZ2BfOxUfEDzTOSIgAChhYAAujW4hIF3EuwwQ7QriwE",
        "CAACAgIAAxkBAAEbMZVjoikyjTr-rv4jZT2lgUO_JkAFygACqRYAAujW4hIPXPFuZ1my0ywE",
        "CAACAgIAAxkBAAEbMZdjoik8jMxygeYgC50tFstKCr1qtQACMg4AAsSXmUi7vSaChmT0pSwE",
        "CAACAgIAAxkBAAEbMZljoilBXw5p0g5TxCbsOiEUR1wuFgACQQ4AAkHimEiT5htQ6TlrbywE",
        "CAACAgIAAxkBAAEbMZtjoilKZrHI3Mf3l4ms_zsrTkIBnAACGAADRtjpBTZtc_-LXcbqLAQ",
        "CAACAgIAAxkBAAEbMaFjoilZou5uOiGQ-dTgCLqtSAaqwQACEAADRtjpBQmUIxTim0XVLAQ",
        "CAACAgIAAxkBAAEbMaNjoilkMeA3ntqzszxyOdH1BGk9LwACBAADRtjpBVJzjcs44cGCLAQ",
        "CAACAgIAAxkBAAEbMaVjoill7ruXER9u8uV4Fpe_Gam_KgACAwADRtjpBcPtpzUoAeJqLAQ",
        "CAACAgIAAxkBAAEbN-1joxJyb5HT-HwG_NdVd0osNRG9NQACrgsAAgEgmUh0QK2awE3FPywE",
        "CAACAgIAAxkBAAEbN-9joxKBsguYAxHcKFnRJvhFy_StQgACXQ0AAuhNmUjg_RCMLw0w5iwE",
        "CAACAgIAAxkBAAEbN-tjoxJU8sv7MAAB410_Jv_VGnZszYYAAoUWAALo1uISw3D6CyfacWQsBA",
        "CAACAgIAAxkBAAEbN_1joxLvNoMkx7oGO8ZC__79a_yNnQAChRMAAujW4hKlp5zMy5b6yCwE",
        "CAACAgIAAxkBAAEbN_VjoxKll7RimNtOknFHBbnaZC6bwgACAQADRtjpBeU-octWQ-lOLAQ",
        "CAACAgIAAxkBAAEbN_djoxLEu0eC5EODB8sRRmoFhZJCAgACBQADRtjpBd9F71Ca1a2QLAQ",
        "CAACAgIAAxkBAAEbN_ljoxLV_SjTZ9U8cFOjYmCNpfM3kAAChxMAAujW4hIFnd0SqT6CDSwE",
        "CAACAgIAAxkBAAEbOBtjoxOh5FFWOIAWzWroVS-_wbVWOwACKwADJ6cOFH2HLTfxFO83LAQ",
        "CAACAgIAAxkBAAEbOC1joxQMqJroxBs2QAdki85ulGiroQACKBMAAujW4hIBbegaUmifiSwE",
        "CAACAgIAAxkBAAEbOC9joxQcMspSFJzcv2IFzeIUgz7LzQACNBMAAujW4hIr3wWuzzmXviwE",
        "CAACAgIAAxkBAAEbOCVjoxPYsHtRuxyoOOQ-djjkroOIHwACRQADJ6cOFEN4k5EbLyJDLAQ",
        "CAACAgIAAxkBAAEbOD1joxSqq5wDOqQkrHUpPknoG-bBIQACrRIAAujW4hIZDsn6Vl9N3CwE",
        "CAACAgIAAxkBAAEbOD9joxS4z3JUqmrnJrSwqIFNkPq5JwACshIAAujW4hLrXCHTCLh17ywE",
        "CAACAgIAAxkBAAEbODFjoxQvYu8-xcQYiZm2qYia2iTYAAPWEwAC6NbiEuQ6bbAtkrJxLAQ",
        "CAACAgIAAxkBAAEbODNjoxQ6hY-aJamcup1UOdr42N3OyAAC2BMAAujW4hK1UEUKsUcAAegsBA",
        "CAACAgIAAxkBAAEbODVjoxRDjzw0MiS6Lfre2LKrR6mnUQAC2xMAAujW4hJf1nfZhgQksCwE",
        "CAACAgIAAxkBAAEbODdjoxSLF36TjJ7U-2zTDLeVUX8NCAACphQAAujW4hLweTP2yeJAsywE",
        "CAACAgIAAxkBAAEbODljoxSdCZgXHmdV2iXsy6LHaOFgNgACqBIAAujW4hLvVzc-DSYFViwE",
        "CAACAgIAAxkBAAEbOG1joxWMmjhS3a9tgn9sFin9GpywWgAC8RAAAowt_Qf8Tl-qgXK7OywE",
        "CAACAgIAAxkBAAEbOG9joxWaBybVbw5qAdNJLMVF9RD1QQAC6xAAAowt_QdeNV1SjgQwPiwE",
        "CAACAgIAAxkBAAEbOGdjoxVrz2ylQ_Qc6khA9UHojGLPzQAC5xAAAowt_QehzoA4bWwLCSwE",
        "CAACAgIAAxkBAAEbOGljoxV5Bl70WEoqyvaWxO6dP958lwAC7RAAAowt_Qc5_hbrTG3BASwE",
        "CAACAgIAAxkBAAEbOH1joxX-HNhHbHDImE7xqLEqcGCzBwACawEAAhAabSJ2Qz3dblM7CiwE",
        "CAACAgIAAxkBAAEbOH9joxYJmAGjfFXJ0dyU90pM-bCxdwACWQEAAhAabSIdlWw5X85AHywE",
        "CAACAgIAAxkBAAEbOHNjoxW2XFULdtmPjXXJkT3Lb41zsAACJAUAAoUnbiTPBjhE89w6SSwE",
        "CAACAgIAAxkBAAEbOHdjoxXi1gzLlEzvBGEHo3tIHrzSRgACaQEAAhAabSLT-dGKr5wzrSwE",
        "CAACAgIAAxkBAAEbOHljoxXqffTuVKgU3ga4G4K7edIXawACXgEAAhAabSLTTkcx_I1jsiwE",
        "CAACAgIAAxkBAAEbOHtjoxXzy3EQBeSJ3k7B2-8GLl1-wQACUgEAAhAabSIuniyLTLFtbiwE",
        "CAACAgIAAxkBAAEbOI1joxamaURYdDWZ265kets_QcfwewACUAQAAs7Y6AuYNDUK-7WCpiwE",
        "CAACAgIAAxkBAAEbOIFjoxYTtS4fT8k8KJnEqa4Fwoe-oQACWgEAAhAabSKRgieXo0mkPCwE",
        "CAACAgIAAxkBAAEbOLRjoxinO32Gllu-RRGQ17YUyKL_XAACaQADy0XsCz1trOe1Ou_lLAQ",
        "CAACAgIAAxkBAAEbOLxjoxkKqmEe42gZ1jSeqIh8XvZ9vQACbQADy0XsC0GbvQ-865FELAQ",
        "CAACAgIAAxkBAAEbOMZjoxlVBaVziRQatys9E2JsRF6a9QACNgEAAhhC7gjcYoKhc99L3ywE",
        "CAACAgIAAxkBAAEbOMhjoxljd52EAd3fTAIRXEc-XIyQQgACSAEAAhhC7giR8ls8wm-QoSwE",
        "CAACAgIAAxkBAAEbOMpjoxluICULRPdGEFMungGGDALQJwACPAEAAhhC7gjGdZOZW3-JHiwE",
        "CAACAgIAAxkBAAEbUD5jpqvyLhm2lM-mAvoMUhVtPgSw5QACpxkAAtIigElWucXJWEBirCwE",
        "CAACAgIAAxkBAAEbUD9jpqvysvs8ghz9EXU1weTS6_BTcwACXhIAAuyZKUl879mlR_dkOywE",
        "CAACAgIAAxkBAAEbUDtjpqvyjK2V8QABE9w-SZfljVw5zNwAAp8BAAIQIQIQyU_KXCmQWj8sBA",
        "CAACAgIAAxkBAAEbUDxjpqvyoOpnKf0hPuWCJfMOd8fHYgAChAEAAiteUwtgPKr0UyWrYywE",
        "CAACAgIAAxkBAAEbUE1jpqvyX86WB6N75DRk2d3jFr2M_AACqwgAAmquZwH9ZUTxSxVdCiwE",
        "CAACAgIAAxkBAAEbUE5jpqvyHTCCtpb8Jqfk13z4VOB6eAACoBwAAipooUjogwEq_q_PRywE",
        "CAACAgIAAxkBAAEbUE9jpqvyR3ZLrhALKbN42JXA4RkEswACgxMAAn_asUiXwT8pzU2ZHiwE",
        "CAACAgIAAxkBAAEbUEFjpqvyl06UqKKVh9KOiArFRrY9qAACKRMAAlLsKElJyGOo5daErCwE",
        "CAACAgIAAxkBAAEbUEJjpqvyMOUE9_LLeqrTxh18GkVkFAACZhYAAqNawUgzzVsQ3OJw_CwE",
        "CAACAgIAAxkBAAEbUENjpqvyy5_RAAENhxKi45LWlSWwo_kAAlgAA1ZkARSkwOrK9-gBXiwE",
        "CAACAgIAAxkBAAEbUERjpqvysaLmcKtHk6V5zZDRixsPjgACww0AArJKCUqlFeh6vgxALCwE",
        "CAACAgIAAxkBAAEbUEZjpqvyR-t7_KkIpMPFNGrUklXeEAACKQADLDXuDJkta9gTOCPtLAQ",
        "CAACAgIAAxkBAAEbUEdjpqvy1616iVobzeAREVbZ7sg5oAACcwcAAmquZwFpQR0Nwqy0IywE",
        "CAACAgIAAxkBAAEbUEhjpqvypVtKXjXeKR63dRzaPnRTbAACiQcAAmquZwF8lx1zMn8OGywE",
        "CAACAgIAAxkBAAEbUEljpqvy5YgmHVZ1NIDrXs7QZxD5_QAClwcAAmquZwH23ZnWEwW6NCwE",
        "CAACAgIAAxkBAAEbUEpjpqvyV410ERNQkERqJtapzCR8GQACmAcAAmquZwHWAAEasnKi98gsBA",
        "CAACAgIAAxkBAAEbUEtjpqvyKCQONdLHg6upW3COGTqQVQACpQcAAmquZwGu_vA8lnjMoSwE",
        "CAACAgIAAxkBAAEbUExjpqvy7D4ZyxYCF679gorHE9NPOQACvgcAAmquZwHK8VZUTTWcKiwE",
        "CAACAgIAAxkBAAEbUF1jpqvyK9zXk0Vqd1ElbpNLRa30mgAChAoAAlyPQEqUyWyzzwcL7iwE",
        "CAACAgIAAxkBAAEbUF5jpqvyXjF_90OVkG7DR-qOKC4ZZgACDgsAAvKDQUrS6sC4oy7xIywE",
        "CAACAgIAAxkBAAEbUF9jpqvyilLcKVUmiJwh39kF8bErmAACdwkAAlugSEplpIWJ8pSHwiwE",
        "CAACAgIAAxkBAAEbUFBjpqvy1P3r9LjD2hZI35NwBDsjfAACGhUAAn4h-Ev_EaW1O2p9NCwE",
        "CAACAgIAAxkBAAEbUFFjpqvyb-r3ieBlesQ_0PNxAvkIRgACfgADgGsjBt87mDLJX0U9LAQ",
        "CAACAgIAAxkBAAEbUFJjpqvy22nGvB2dZbQ8Msy-6xNJpgACBAEAAladvQreBNF6Zmb3bCwE",
        "CAACAgIAAxkBAAEbUFNjpqvyZu96kVKCsKHu55Z2bWdJlgAC9RoAAr4mOEuhBFSZoi-H7SwE",
        "CAACAgIAAxkBAAEbUFRjpqvyiZ-v3WKyDSi-o_Ox6l9LXwACrAEAAhAhAhA_9Sr9iZqlJSwE",
        "CAACAgIAAxkBAAEbUFVjpqvy3-uP8QjqiAFNZxfulEJ-UgACoAgAAvoLtgjyzxe80ifojSwE",
        "CAACAgIAAxkBAAEbUFpjpqvyrt_YkNXWT9kvx-bmZ93DmgACphAAAvQ4gUlVbWdHipEgASwE",
        "CAACAgIAAxkBAAEbUFtjpqvyHzd0fOMiC-5EMiOLuNPBdgACIgADzCHSGblpXzQRar3jLAQ",
        "CAACAgIAAxkBAAEbUFxjpqvy3Wxj6H-U2smKYD06U3XESQACfQwAAhUzkEgv68vaH8_UqCwE",
        "CAACAgIAAxkBAAEbUG1jpqvyJYvCFdu9dgqafXAtwR-rmQACPQIAAkcVaAl_L1qTcXqObiwE",
        "CAACAgIAAxkBAAEbUG5jpqvyj0LM_Es8A5XKMvFB4wjCEgACbwADwDZPE5c6I5Jz7_NYLAQ",
        "CAACAgIAAxkBAAEbUG9jpqvyKihAqeT9QkoX3YkGlQE_FwACNQADWNyzCn30L7o4Wk3CLAQ",
        "CAACAgIAAxkBAAEbUGBjpqvynObADdQWfhe2c-kq13U2IAACFgADfNH-IM6AIBSxm1F_LAQ",
        "CAACAgIAAxkBAAEbUGNjpqvy3sRHnD_WKSUuTPoHNSeMZgACIVQAAp7OCwABSFL1BCGffJQsBA",
        "CAACAgIAAxkBAAEbUGRjpqvy48DZChSBSv1FRFsAARXe89cAAlMCAAJWnb0KvcWKRCnHe0MsBA",
        "CAACAgIAAxkBAAEbUGVjpqvyQpQIep-Y2q6MMtk8qL_BXAACYgIAAladvQrfUNgPvAABLqwsBA",
        "CAACAgIAAxkBAAEbUGZjpqvy49eE960TP9z1qCCeAAGZDuEAAucQAAKMLf0Hoc6AOG1sCwksBA",
        "CAACAgIAAxkBAAEbUGdjpqvySZubK-wmQ9CN26t8tyjhdAACjwEAAiteUwtSWZbMUSUiwiwE",
        "CAACAgIAAxkBAAEbUGhjpqvyK2s_KZ40P6ywYVc2yUNvugAC9QADMNSdEdzXi8FemlL1LAQ",
        "CAACAgIAAxkBAAEbUGljpqvy8ko3efC81FO2wAx7DF3WEQACsAEAAguJ8wTjB4n8Z4a45CwE",
        "CAACAgIAAxkBAAEbUGpjpqvykJUWrUd9kSkjs9ib9hIxAgACgwEAAguJ8wR0zbWO-eg6AiwE",
        "CAACAgIAAxkBAAEbUGtjpqvy7xvmEE7HgmM-3QJVCD8_WgACagADwDZPE_6bl3vsHAfaLAQ",
        "CAACAgIAAxkBAAEbUGxjpqvyyNi9KYIQFWxsORKrhTg3jgACJwADWNyzCvqyKhS_FCA6LAQ",
        "CAACAgIAAxkBAAEbUH1jpqvzfNB3zGYS5B_CN9KZjc-QZQAC3AUAAjbsGwVRpJu1Iih9MywE",
        "CAACAgIAAxkBAAEbUH5jpqvz2iK9OPKP6oYNJ4QZY4hDfgACdgADJQNSD5NSJFpvrq1zLAQ",
        "CAACAgIAAxkBAAEbUH9jpqvzS1_4CJ1TXhxzkNY_RhEN4AACFQADwDZPE81WpjthnmTnLAQ",
        "CAACAgIAAxkBAAEbUHFjpqvyG4yPAAFfBhm-H-WBE8ioLwQAAh4BAAIfAUwVjy4zbHa0eDcsBA",
        "CAACAgIAAxkBAAEbUHJjpqvyphx8R5aBk4hGxbyLwmuwngACEgEAAh8BTBXIGe_jzD8UcSwE",
        "CAACAgIAAxkBAAEbUHRjpqvyVihXcJ-GmXtJOaixUI_exAACMAUAAj-VzArb-eD1XSgYNSwE",
        "CAACAgIAAxkBAAEbUHVjpqvyo1YyTdqC3W0ulqyGkbrsXwACOgUAAj-VzArEfk5CrkA_XCwE",
        "CAACAgIAAxkBAAEbUHZjpqvy3PEMTUKa334LVMHKv37IvQACIwADWbv8JZG80mBAZfPHLAQ",
        "CAACAgIAAxkBAAEbUHhjpqvyEG7ks4UW3b9F6CwZcT_rVQACBAADO2AkFLOr61RvleGrLAQ",
        "CAACAgIAAxkBAAEbUHljpqvyPsZfUT7GtLmzIwsZvsY8ogACEwADO2AkFHvbHgUExl7cLAQ",
        "CAACAgIAAxkBAAEbUHpjpqvyQdM5Fau-9aETqKZbUkOnQwACe1UAAp7OCwABTdRULjJ7xlgsBA",
        "CAACAgIAAxkBAAEbUHtjpqvzQoLYCOHxg-pbINu4K5FZ-QACklUAAp7OCwAB9JI4WOfJ01wsBA",
        "CAACAgIAAxkBAAEbUIBjpqvzhr-kxila_ZfOQ8HiT3NByQACGQADwDZPE9BDgPYgVxRLLAQ",
        "CAACAgIAAxkBAAEbUIFjpqvzaPEkDZP2Jy0Yi3BddIKJbgACxgADvvjfEV5w46Ak5u3yLAQ",
        "CAACAgIAAxkBAAEbUIJjpqvzCWQmz-z8VOjrOMVd98MW3QAC-AYAAvoLtgi7wcfDOuEvDCwE",
        "CAACAgIAAxkBAAEbUINjpqvzZjP8QPfucl9uwAQf9IX1LAAC9gYAAvoLtghXzzJAZR00WCwE",
        "CAACAgIAAxkBAAEbUIRjpqvzpPrwT13eMDSaRJVpFZZFZwAC4AIAAkcVaAmdGYDGukHkBywE",
        "CAACAgIAAxkBAAEbUIVjpqvzwyaBj_mYAAHp8eb25z15AAFBAAKdAQACUhThCpO-JET3UZ2WLAQ",
        "CAACAgIAAxkBAAEbUIZjpqvzI5bQdHnPAtZUnBM7f9wctgACGQADm-CXGUVfxFuyNnAKLAQ",
        "CAACAgIAAxkBAAEbUIdjpqvz8xmqXkmZao2Vd6-b8ZDehAACNzoAAuCjggflPsyBYCy3pywE",
        "CAACAgIAAxkBAAEbUIljpqvzL55H2iCWKqKJbcndoWHsfgACcBQAAkKvaQABN_UsiRlINiEsBA",
        "CAACAgIAAxkBAAEbUIpjpqvzCvIAAUSOTBpzjKtcWH5weEsAAoQCAALEq2gLj8AUwYOU3DssBA",
        "CAACAgIAAxkBAAEbUTNjpq78KssMiLvoK2w8JajeZmQUUAACHgEAAh8BTBWPLjNsdrR4NywE",
        "CAACAgIAAxkBAAEbUXJjpryuk9H4l_K3E8K2A7EVMLYKzAACUhwAArpGAAFLXy3Mbjguu1EsBA",
        "CAACAgIAAxkBAAEbUXhjprz8Plx4v_ehvkXXSl3OdBTHHAAC0RoAAqSmAAFLWdXNSI6k5WgsBA",
        "CAACAgMAAxkBAAEbOMBjoxk3sliHcMSsoaD8K8mUDPQvqQACmQEAAr-MkAQ7kbFmJg0AAcgsBA",
        "CAACAgQAAxkBAAEbMPpjohHKvIhG5MI1hTJz9LhW5SLcoAACJgoAAjyzSVGL-i5jgkRXSCwE",
        "CAACAgQAAxkBAAEbN_9joxL9m8HwcE0ExpEuyo57jHNp1gACnxEAAqbxcR57wYUDyflSISwE",
        "CAACAgQAAxkBAAEbOA9joxNZSoF-G_bHYqld_f1vTmpEsQACgAoAArv0aFKqohnxcfVcUCwE",
        "CAACAgQAAxkBAAEbOAFjoxMUGxLNtKf3ZjE5krio-LBbFgAC6gsAAmwiEVOtWUCotxfPAywE",
        "CAACAgQAAxkBAAEbOAhjoxNLQRVWCLiUbK3amPDRSPdKNQACJgoAAjyzSVGL-i5jgkRXSCwE",
        "CAACAgQAAxkBAAEbOBNjoxNym0XDPLWImf9KF0lKxaUnogAC4gwAAih0GVPLutRasaibiSwE",
        "CAACAgQAAxkBAAEbONBjoxn_eiMxwHIpUrNqVigbej6J3gACXRcAAqbxcR5KJ8yAbCRfFCwE",
        "CAACAgQAAxkBAAEbONJjoxoLv4WaQI9smlqhdW6ITmJGSQACbBcAAqbxcR4-TpUh9E1wliwE",
        "CAACAgQAAxkBAAEbONRjoxoYuwKZoGS_XTrSUqKWphEOJAACZhcAAqbxcR57yR0zPP6PVywE",
        "CAACAgQAAxkBAAEbUEVjpqvyM_7X0KsWW04cuusHGTm8ZQAC8gMAAv4zDQabpUiThIHTbywE",
        "CAACAgQAAxkBAAEbUFhjpqvyletDsO3BlNxdyBSGJCSurgACMwADzjkIDeW4xw3ujkQ1LAQ",
        "CAACAgQAAxkBAAEbUFljpqvyHXYtLhauoaMCWkYwRT9mAwACNAADzjkIDTXJ9rftUKq-LAQ",
        "CAACAgQAAxkBAAEbUHBjpqvy2QKvg8n_tiIJe6F50kQLzgACmAIAAt59GQx02BJFMlmmeCwE",
        "CAACAgUAAxkBAAEbOF1joxUmAAGY94KqYTxierNJZ5FCFWsAAiEAA-Dq8B0jN533UOSUdywE",
        "CAACAgUAAxkBAAEbOFVjoxT21NemaB8XZWgQ-n30y_MQpwACEAAD4OrwHb1eag-0nNQgLAQ",
        "CAACAgUAAxkBAAEbOFdjoxUBo9VvansZWnSW68lGZjCG8gACDQAD4OrwHWzH-ysaq4gRLAQ",
        "CAACAgUAAxkBAAEbOFtjoxUUzo73T5fS4Qvoj-Ui-KOsoQACDgAD4OrwHXsD7H4mGmCDLAQ",
        "CAACAgUAAxkBAAEbOGNjoxVDZfchmmMNnL6P6viUi2sMtgACKwAD4OrwHVCv6JG8exQgLAQ",
        "CAACAgUAAxkBAAEbUEBjpqvyaq5hWfsrDQh0DZSIutW0HQACZw4AAsZRxhXHmG4ay8fjmCwE",
        "CAACAgUAAxkBAAEbUFZjpqvyrIRAJ9NHdd96eYc9ryQVzAACWBUAAtgqVg2lDzeo-ZbPzSwE",
        "CAACAgUAAxkBAAEbUFdjpqvyt6f4pSZ6vRlxTv7MVYl1-QACZBUAAtgqVg35PVwa3pRDuywE",
        "CAACAgUAAxkBAAEbUHdjpqvyGwJhjiJ3gLgsbNsmwMfJ0gACZgADxlHGFWdiI-4mWFEFLAQ",
        "CAACAgIAAxkBAAEbXxFjqVwO5h621jb_ZJGA2YOweBsj3QAChwIAAu0gPgY8dExHPfFmTSwE",
        "CAACAgIAAxkBAAEbXw9jqVwAAnhnlJlkPud1Ywier6RbLwAChgIAAu0gPgY3nlUkz-JZDiwE"
    ];

    static getRandomSticker() {
        return this.stickers[Math.floor(Math.random() * this.stickers.length)];
    }
}

export class BotConfiguration {
    public bot: Telegraf
    constructor(props: BotConfigurationProps) {
        this.bot = props.bot;
        this.configureBot();
    }

    private configureBot() {
        this.configureMessageHandler();
    }

    private getMessageEntities(message: Context['message']): Array<MessageEntity> {
        const entities = (message && ('entities' in message)) ? (message.entities || []) : [];
        const captionEntitites = (message && ('caption_entities' in message)) ? (message.caption_entities || []) : [];
        return [
            ...entities,
            ...captionEntitites,
        ]
    }

    private getMessageText(message: Context['message']): string | undefined {
        if (!message) {
            return '';
        }

        if ('text' in message) {
            return message.text;
        }

        if ('caption' in message) {
            return message.caption || '';
        }

        return '';
    }

    private async configureMessageHandler() {
        // @ts-ignore
        this.bot.on('message', async (ctx) => {
            const msg = ctx.message;
            const text = this.getMessageText(msg);
            const entities = this.getMessageEntities(msg);
            for (const entity of entities) {
                if (entity.type === "hashtag") {
                    const value = text?.slice(entity.offset + 1, entity.offset + entity.length);
                    if (value === "сделалдело") {
                        return await ctx.replyWithSticker(Sticker.getRandomSticker(), {
                            reply_to_message_id: msg.message_id,
                            disable_notification: true,
                        });
                    }
                }
            }
        });
    }
}
