# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css

  tabs: [
    {
      title: "Home"
      id: "index"
      location: "Good4Trade#index" # Supersonic module#view type navigation
    }
    {
      title: "My Items"
      id: "geolocation"
      location: "Good4Trade#myitems" # URLs are supported!
    }
 #   {
 #     title: "Search"
 #     id: "internet"
 #     location: "Good4Trade#addItem"
 #   }

  ]
#   rootView:
#     location: "Good4Trade#index"

  preloads: [
    {
      id: "learn-more"
      location: "example#learn-more"
    }
    {
      id: "using-the-scanner"
      location: "example#using-the-scanner"
    }
  ]

  drawers:
    left:
      id: "leftDrawer"
      location: "Good4Trade#drawer"
      showOnAppLoad: false
    options:
      animation: "swingingDoor"

      
  initialView:
     id: "initialView"
     location: "Good4Trade#init"
