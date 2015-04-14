# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css

  tabs: [
    {
      title: "Index"
      id: "index"
      location: "Good4Trade#index" # Supersonic module#view type navigation
    }
    {
      title: "Add Item"
      id: "geolocation"
      location: "Good4Trade#addItem"
    }
    {
      title: "Your Items"
      id: "internet"
      location: "Good4Trade#items" # URLs are supported!
    }
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

  # drawers:
  #   left:
  #     id: "leftDrawer"
  #     location: "example#drawer"
  #     showOnAppLoad: false
  #   options:
  #     animation: "swingingDoor"
  #
  initialView:
     id: "initialView"
     location: "Good4Trade#init"
