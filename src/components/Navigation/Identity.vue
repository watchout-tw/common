<template>
<div>
  <nav class="navbar sticky-top navbar-light" :class="channel.classes.bg">
    <a class="navbar-brand" :href="channel.links.home"><img :src="channel.asset.logoWithType.regular.src" class="logo-type" :style="channel.asset.logoWithType.regular.style"/></a>
    <a class="navbar-button" id="navbar-identity" @click="toggleModal">Login</a>
  </nav>
</div>
</template>

<script>
import dataStore from '../../lib/dataStore'

var currentChannel = dataStore.channels.park

export default {
  name: 'navigation-with-identity',
  mounted () {
    console.log('#' + this.channel.id)
    console.log('Navigation with identity initiated.')
  },
  data () {
    return {
      channel: currentChannel,
      modalOpened: false
    }
  },
  methods: {
    toggleModal () {
      var $ = global.$
      $('#modal-auth').modal('show')
    }
  }
}
</script>

<style lang="scss">
@import '../../../styles/resources';
@import '../../../styles/main';

input[type="text"],
input[type="email"],
input[type="password"] {
  background: none;
  border: none;
  border-bottom: 2px $color-border-grey solid;
  line-height: 1.75;
  padding: 0;
  margin: 0;

  &.full-width {
    width: 100%;
  }
}
button {
  background: $color-park;
  border: 2px $color-border-grey solid;
  border-radius: 2px;
  line-height: 1;
  padding: 0.75rem;
  cursor: pointer;

  &.small {
    font-size: 0.875rem;
    padding: 0.5rem;
  }
}
input + button {
  margin-left: 0.5rem;
}
.field {
  margin: 0.5rem 0;
  &:first-of-type {
    margin: 0 0 0.5rem;
  }
  &:last-of-type {
    margin: 0.5rem 0 0;
  }
}

.form-check-label {
  > * {
    vertical-align: middle;
  }
  > input[type="checkbox"] {
    margin-right: 0.25rem;
  }
}
input[type="checkbox"] {
  -webkit-appearance: none;
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
  position: relative;
  -webkit-transition: .15s;
  background-color: rgba($color-park, 0.25);
  border: 2px $color-border-grey solid;
  border-radius: 2px;
}
input[type="checkbox"]:checked {
  background-color: $color-park;
}
input[type="checkbox"]:before,
input[type="checkbox"]:checked:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 1.25rem;
  text-align: center;
  color: black;
  @include font-monospace;
}
input[type="checkbox"]:checked:before {
  content: 'V';
}

.modal {
}
.modal-dialog {
  width: 18rem;
  margin: 5rem auto 0;
  @include shadow;
}
.modal-backdrop {
  background: white;
  &.show {
    opacity: 0.95;
  }
}
.accordion {
  > .card {
    background: none;
    border: none;
    border-radius: 0;
    > .card-header {
      border: none;
      background: none;
    }
  }
}

#modal-auth {
  .modal-dialog {
    //background: linear-gradient(to bottom, rgba($color-park, 0.25), rgba($color-park, 0.25)), linear-gradient(to bottom, rgba(white, 0.5), rgba(white, 0.5));
    background: rgba($color-park, 0.35);
  }
  .accordion {
    > .card {
      padding: 0 1rem;
      > .card-head {
        padding: 1rem 0;
      }
      > .card-body {
        > .padding {
          padding-bottom: 1rem;
        }
      }
    }
    > .card.dark {
      @include bg-park-light;
    }
  }
}
#form-join {
  [name="id"] {
    width: 12.5rem;
  }
}
.navbar-button {
  display: block;
  width: 60px;
  height: 64px;
  &:hover {
    background: rgba(white, 0.25);
  }
}
#navbar-identity {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
