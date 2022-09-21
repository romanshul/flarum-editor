import { extend, override } from 'flarum/common/extend';
import applyEditor from '../common/applyEditor';
import addPreferences from "./addPreferences";

app.initializers.add('romansh/flarum-editor', function(app) {
  // Your Extension Code Here
  addPreferences();
  applyEditor();
});
