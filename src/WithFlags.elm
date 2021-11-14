module WithFlags exposing (main)

import Browser
import Html exposing (button, div, text)
import Html.Events exposing (onClick)


init initialValue =
    ( initialValue, Cmd.none )


type Msg
    = Increment
    | Decrement


update : Msg -> Int -> ( Int, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            ( model + 1, Cmd.none )

        Decrement ->
            ( model - 1, Cmd.none )


view model =
    div []
        [ button [ onClick Decrement ] [ text "-" ]
        , div [] [ text (String.fromInt model) ]
        , button [ onClick Increment ] [ text "+" ]
        ]


main =
    Browser.element { init = init, update = update, view = view, subscriptions = \_ -> Sub.none }
