import { extend } from 'flarum/common/extend';
import FieldSet from 'flarum/common/components/FieldSet';
import Switch from 'flarum/common/components/Switch';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import ItemList from 'flarum/common/utils/ItemList';

export default function addPreferences() {
  extend(SettingsPage.prototype, 'settingsItems', function (items) {
    items.add(
      'composer',
      FieldSet.component(
        {
          label: 'Composer',
          className: 'Settings-composer',
        },
        this.composerItems().toArray()
      )
    );
  });

  SettingsPage.prototype['composerItems'] = function () {
    const items = new ItemList();

    items.add(
      'useRichTextEditor',
      Switch.component(
        {
          state: this.user.preferences().useRichTextEditor,
          onchange: (value) => {
            this.useRichTextEditorLoading = true;

            this.user.savePreferences({ useRichTextEditor: value }).then(() => {
              this.useRichTextEditorLoading = false;
              m.redraw();
            });
          },
          loading: this.useRichTextEditorLoading,
        },
        'User flarum editor?'
      )
    );

    items.add(
      'richTextCompactParagraphs',
      Switch.component(
        {
          state: this.user.preferences().richTextCompactParagraphs,
          onchange: (value) => {
            this.richTextCompactParagraphsLoading = true;

            this.user.savePreferences({ richTextCompactParagraphs: value }).then(() => {
              this.richTextCompactParagraphsLoading = false;
              m.redraw();
            });
          },
          loading: this.richTextCompactParagraphsLoading,
        },
        'paragraph loading label'
      )
    );

    return items;
  };
}
