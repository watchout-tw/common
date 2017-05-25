<template>
<div id="modal-auth" class="modal">
  <div class="modal-dialog">
    <div class="accordion" id="modal-auth-accordion">
      <div class="card">
        <a class="card-head" data-toggle="collapse" href="#form-join" data-parent="#modal-auth-accordion">
          <h4>成為草民</h4>
        </a>
        <div class="card-body collapse show" id="form-join">
          <div class="padding">
            <div class="field d-flex justify-content-between align-items-end"><input type="text" name="id" placeholder="草民代號" /><button class="small">隨機</button></div>
            <div class="field"><input type="email" name="email" placeholder="Email" class="full-width" /></div>
            <div class="field"><input type="password" name="password" placeholder="密碼" class="full-width" /></div>
            <div class="field d-flex justify-content-between align-items-center"><button>註冊</button><label class="form-check-label"><input type="checkbox"><span>我同意使用條款</span></label></div>
          </div>
        </div>
      </div>
      <div class="card dark">
        <a class="card-head" data-toggle="collapse" href="#form-login" data-parent="#modal-auth-accordion">
          <label class="text-color-park">已經有帳號了？</label>
          <h4>草民登入</h4>
        </a>
        <div class="card-body collapse" id="form-login">
          <div class="padding">
            <div class="field"><input type="text" name="id-or-email" placeholder="草民代號或Email" class="full-width" /></div>
            <div class="field"><input type="password" name="password" placeholder="密碼" class="full-width" /></div>
            <div class="field"><button>登入</button></div>
          </div>
        </div>
      </div>
      <div class="card dark">
        <div class="card-body">
          <div class="padding">
            <label class="text-color-park">你在找Facebook登入嗎？</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import common from 'common'

export default {
  name: 'modal-auth',
  data() {
    return {
      DataStore: common.DataStore
    }
  }
}
</script>

<style lang="scss">
@import '~common/styles/resources';
@import '~common/styles/main';

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
</style>
