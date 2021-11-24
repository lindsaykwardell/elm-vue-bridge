module Components.Examples.Component.Input exposing
    ( Config
    , InputState
    , Msg(..)
    , init
    , view
    )

import Html exposing (Html, input, label, text)
import Html.Attributes exposing (value)
import Html.Events exposing (onInput)


type alias Config msg =
    { modelValue : InputState
    , labelText : String
    , onInput : Msg -> msg
    }


type Msg
    = UpdateValue InputState


type InputState
    = InputState String


init : InputState
init =
    InputState ""


view : Config msg -> Html msg
view config =
    case config.modelValue of
        InputState state ->
            label []
                [ text config.labelText
                , input
                    [ value state
                    , onInput
                        (\input ->
                            UpdateValue
                                (InputState input)
                                |> config.onInput
                        )
                    ]
                    []
                ]
