/*global tinymce gapi google*/
import icon from "!!raw-loader!./googledrive.svg"

tinymce.util.Tools.resolve("tinymce.PluginManager").add("googledrive", function(editor) {
  let clientId = ""
  let devKey = ""
  let scope = "https://www.googleapis.com/auth/drive.readonly"
  let pickerApiLoaded = false
  let pickerRequested = false
  let apiInitiated = false
  let googleAuth = null

  function onApiLoad() {
    gapi.load("picker", () => {
      pickerApiLoaded = true
      signIn()
    })
    gapi.load("auth2", () => {
      gapi.auth2.init({ client_id: clientId }).then(auth => {
        apiInitiated = true
        googleAuth = auth
        signIn()
      }).catch((error) => {
        console.error("Failed to initialize auth2: ", error)
      })
    })
  }

  function signIn() {
    if (pickerRequested && pickerApiLoaded && apiInitiated) {
      let user = googleAuth.currentUser.get()
      if (googleAuth.isSignedIn.get() && user.hasGrantedScopes(scope)) {
        createPicker(user.getAuthResponse(true).access_token)
      }
      else {
        googleAuth.signIn({ scope: scope }).then(result => {
          if (result && !result.error) {
            createPicker(result.getAuthResponse().access_token)
          }
          else {
            console.error("Failed to sign in: ", result.error)
          }
        }).catch((error) => {
          console.error("Failed to sign in: ", error)
        })
      }
    }
  }

  function createPicker(token) {
    let picker = new google.picker.PickerBuilder().
        addView(google.picker.ViewId.DOCS_IMAGES).
        setOAuthToken(token).
        setDeveloperKey(devKey).
        setCallback(insertImage).
        build()
    picker.setVisible(true)
    pickerRequested = false
  }

  function insertImage(data) {
    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
      let doc = data[google.picker.Response.DOCUMENTS][0]
      let url = doc[google.picker.Document.URL]
      let match = url.match(/\/file\/d\/([^/]+)/)
      if (match) {
        editor.insertContent("<img src=\"http://drive.google.com/uc?export=view&id=" + match[1] + "\">")
      }
      else {
        console.error("Failed to extract id from: ", url)
      }
    }
  }

  let script = document.createElement("script")
  script.onload = onApiLoad
  script.async = true
  script.src = "https://apis.google.com/js/api.js"
  document.head.appendChild(script)

  editor.ui.registry.addIcon("googledrive", icon)
  editor.ui.registry.addButton("googledrive", {
    icon: "googledrive",
    tooltip: "Insert image from Google Drive",
    onAction: () => {
      pickerRequested = true
      signIn()
    }
  })
})
