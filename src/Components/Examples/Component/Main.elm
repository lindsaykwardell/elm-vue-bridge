module Components.Examples.Component.Main exposing (main)

import Browser
import Components.Examples.Component.Input as Input exposing (InputState)
import Html exposing (Html, div)


type alias Model =
    { value : InputState
    }


init : Model
init =
    { value = Input.init
    }


type Msg
    = UpdateValue InputState


update : Msg -> Model -> Model
update msg model =
    case msg of
        UpdateValue value ->
            { model
                | value = value
            }


view : Model -> Html Msg
view model =
    div []
        [ Input.view
            { modelValue = model.value
            , labelText = "Name"
            , onInput = \(Input.UpdateValue value) -> UpdateValue value
            }
        ]


main : Program () Model Msg
main =
    Browser.sandbox { init = init, update = update, view = view }
