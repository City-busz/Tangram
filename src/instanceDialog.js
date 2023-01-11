import Gtk from "gi://Gtk";
import { gettext as _ } from "gettext";

import { once } from "../troll/src/util.js";
import instance_dialog from "./instanceDialog.blp" assert { type: "string" };

export function editInstanceDialog(props) {
  return instanceDialog({ ...props, mode: "edit" });
}

export function addInstanceDialog(props) {
  return instanceDialog({ ...props, mode: "add" });
}

async function instanceDialog({ window, instance, mode }) {
  const builder = Gtk.Builder.new_from_string(instance_dialog, -1);
  const dialog = builder.get_object("dialog");
  dialog.title = instance.name;
  dialog.set_transient_for(window);

  const button_save = builder.get_object("button_save");
  button_save.label = mode === "add" ? _("Add") : _("Update");

  const nameEntry = builder.get_object("name");
  nameEntry.text = instance.settings.get_string("name");

  const URLEntry = builder.get_object("url");
  URLEntry.text = instance.settings.get_string("url");

  button_save.set_sensitive(!!URLEntry.text);
  URLEntry.connect("changed", () => {
    const isValid = !!URLEntry.text;
    button_save.set_sensitive(isValid);
  });

  const notificationsPriority = builder.get_object("notifications-priority");
  notificationsPriority.selected = instance.settings.get_enum(
    "notifications-priority",
  );

  const userAgentEntry = builder.get_object("user-agent");
  userAgentEntry.text = instance.settings.get_string("user-agent");

  dialog.show();

  const [response_id] = await once(dialog, "response");
  if (response_id === Gtk.ResponseType.DELETE_EVENT) {
    return true;
  }

  if (response_id !== Gtk.ResponseType.APPLY) {
    dialog.destroy();
    return true;
  }

  instance.settings.set_string("name", nameEntry.text);
  instance.settings.set_string("url", URLEntry.text);
  instance.settings.set_string("user-agent", userAgentEntry.text);
  instance.settings.set_enum(
    "notifications-priority",
    notificationsPriority.selected,
  );

  dialog.destroy();

  return false;
}
