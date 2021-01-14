<template>
  <div class="form-section form-section_inner">
    <button
      type="button"
      class="remove-button"
      @click="removeAgendaItem(index)"
    >
      <app-icon icon="trash" />
    </button>

    <div class="form-group">
      <select v-model.lazy="type" title="Тип">
        <option value="other">Другое</option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
            v-model.lazy="startsAt"
            type="time"
            placeholder="00:00"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            class="form-control"
            v-model.lazy="endsAt"
            type="time"
            placeholder="00:00"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Заголовок</label>
      <input class="form-control" v-model.lazy="title" />
    </div>
    <div class="form-group">
      <label class="form-label">Описание</label>
      <textarea class="form-control" v-model.lazy="description"></textarea>
    </div>
  </div>
</template>

<script>
import AppIcon from '@/components/AppIcon';
import { mapMutations } from 'vuex';

const mapField = (field, getter, setter) => ({
  get() {
    return getter(this, field);
  },
  set(value) {
    setter(this, field, value);
  },
});

const mapFields = (fields, getter, setter) =>
  fields.reduce(
    (map, field) => ({
      ...map,
      [field]: mapField(field, getter, setter),
    }),
    {},
  );

export default {
  name: 'MeetupAgendaItemForm',

  props: {
    index: {
      type: Number,
      required: true,
    },
  },

  components: {
    AppIcon,
  },

  computed: {
    agendaItem() {
      return this.$store.getters['form/GET_AGENDA_ITEM_BY_INDEX'](this.index);
    },

    ...mapFields(
      ['title', 'description', 'type', 'startsAt', 'endsAt'],
      (vm, field) => vm.agendaItem[field],
      (vm, field, value) => {
        vm.setAgendaItemField({ index: vm.index, field, value });
      },
    ),
  },

  methods: {
    ...mapMutations('form', {
      setAgendaItemField: 'SET_AGENDA_ITEM_FIELD',
      removeAgendaItem: 'REMOVE_AGENDA_ITEM',
    }),
  },
};
</script>

<style scoped></style>
