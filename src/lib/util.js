import axios from 'axios'

export function handleThatError(error) {
  console.error(error)
  if(error.response) {
    if(error.response.data) {
      console.log(error.response.data)
    }
  }
}
export function handleThatErrorAndAlert(error) {
  handleThatError(error)
  if(error.response) {
    if(error.response.data) {
      if(error.response.data.message) {
        sysAlert(error.response.data.message)
      }
    }
  }
}
export function jwtTokenIsHere() {
  return !!localStorage.getItem('watchout-token')
}
export function isAdmin() {
  const adminRoles = ['god', 'editor']
  const roleString = getCitizenRoleString()
  return !adminRoles.reduce(function(flag, role) {
    return flag && roleString.indexOf(role) < 0
  }, true)
}
export function getCitizenHandle() {
  return localStorage.getItem('watchout-citizen-handle')
}
export function getCitizenFirstEmail() {
  return localStorage.getItem('watchout-citizen-first-email')
}
export function getCitizenRoleString() {
  return localStorage.getItem('watchout-citizen-roles')
}
export function authenticateAxios() {
  const token = localStorage.getItem('watchout-token')
  if(token) {
    axios.defaults.headers.common['Authorization'] = token
  }
}
export function getCitizen($store) { // FIXME: seems like a bad idea to pass $store around
  if(jwtTokenIsHere()) {
    const handle = getCitizenHandle()
    const email = getCitizenFirstEmail()
    if(handle && !email) {
      axios.get(`/citizen/${handle}/emails`).then(response => {
        let emails = response.data.rows
        if(emails.length > 0) {
          localStorage.setItem('watchout-citizen-first-email', emails[0].email)
        }
      }).catch(handleThatError)
    }
  }
}
export function makeCitizenRoleString(roles) {
  return roles.map(role => role.channel + '.' + role.name).join(',')
}

const sysMessageDict = {
  system_unknown_error: '系統發生不明的錯誤',
  park_auth_no_facebook: '什麼是Facebook？',
  park_auth_tos_agreement_required: '你必須同意使用條款',
  park_auth_join_info_incomplete: '你必須填寫草民代號、Email及密碼',
  park_auth_login_info_incomplete: '請輸入草民代號及密碼',
  park_auth_email_addr_not_valid: '你必須輸入有效的Email',
  park_auth_reset_pwd_input_mismatch: '你必須輸入兩次一致的新密碼',
  park_auth_token_not_found: '你的token呢？',
  park_welcome_back: '歡迎回到沃草共有地',
  system_db_bad_query: '核心資料庫出錯',
  system_db_operation_failed: '核心資料庫出錯',
  system_email_delivery_failed: 'Email送不出去',
  system_invalid_token: '你的token無效',
  system_db_dup_entry: '你op了',
  system_forbidden: '你沒有權限這麼做',
  system_not_found: '在諾大的草原裡，找不到你要的東西',
  core_citizen_forbidden_handle: '這個草民代號已經有人使用囉',
  core_citizen_email_in_used: '這個Email已經有人使用囉',
  core_citizen_handle_in_used: '這個草民代號已經有人使用囉',
  core_citizen_email_not_verified: '你的Email未認證',
  core_citizen_login_failed: '草民代號、Email或密碼錯誤'
}

function rawToSysMessage(raw) {
  let code = 'system_unknown_error'
  if(sysMessageDict.hasOwnProperty(raw)) {
    code = raw
  } else {
    // these rules process error messages from validator
    if(raw.indexOf('handle') > -1) {
      code = 'core_citizen_login_failed'
    } else if(raw.indexOf('email') > -1) {
      code = 'park_auth_email_addr_not_valid'
    }
  }
  return sysMessageDict[code]
}

export function sysAlert(code) {
  alert(rawToSysMessage(code))
}
