import Gtk from "gi://Gtk";
import WebKit from "gi://WebKit2";
import Soup from "gi://Soup";
import Adw from "gi://Adw";
import { gettext as _ } from "gettext";

import {
  getGIRepositoryVersion,
  getGjsVersion,
  getGLibVersion,
} from "../troll/src/util.js";

const debug_info = `
WebKitGTK ${getGIRepositoryVersion(WebKit)}
GJS ${getGjsVersion()}
Adw ${getGIRepositoryVersion(Adw)}
GTK ${getGIRepositoryVersion(Gtk)}
GLib ${getGLibVersion()}
libsoup ${getGIRepositoryVersion(Soup)}
`.trim();

export default function AboutDialog({ application }) {
  const dialog = new Adw.AboutWindow({
    transient_for: application.get_active_window(),
    application_name: "Tangram",
    developer_name: "Sonny Piers",
    copyright: "© 2019-2023 Sonny Piers",
    license_type: Gtk.License.GPL_3_0_ONLY,
    version: pkg.version,
    website: "https://tangram.sonny.re",
    application_icon: pkg.name,
    issue_url: "https://github.com/sonnyp/Workbench/issues",
    // TRANSLATORS: eg. 'Translator Name <your.email@domain.com>' or 'Translator Name https://website.example'
    translator_credits: _("translator-credits"),
    debug_info,
    developers: ["Sonny Piers https://sonny.re"],
    designers: [
      "Sonny Piers https://sonny.re",
      "Tobias Bernard <tbernard@gnome.org>",
    ],
    artists: ["Tobias Bernard <tbernard@gnome.org>"],
  });
  dialog.add_credit_section(_("Contributors"), [
    "codyfish https://github.com/codyfish",
    // Add yourself as
    // "John Doe",
    // or
    // "John Doe <john@example.com>",
    // or
    // "John Doe https://john.com",
  ]);
  dialog.present();

  return dialog;
}
