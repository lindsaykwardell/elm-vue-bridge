module Components.Counter.Main exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (id, style)
import Html.Events exposing (onClick)


type alias Model =
    Int


init : Model
init =
    0


type Msg
    = Increment
    | Decrement


update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1


view : Model -> Html Msg
view model =
    div
        [ id "counter"
        , style "display" "flex"
        , style "justify-content" "center"
        , style "gap" "15px"
        , style "padding" "15px"
        , style "font-size" "2rem"
        ]
        [ button
            [ style "padding" "10px 20px"
            , style "cursor" "pointer"
            , onClick Decrement
            ]
            [ text "-" ]
        , div [ style "width" "100px", style "text-align" "center" ] [ text (String.fromInt model) ]
        , button
            [ style "padding" "10px 20px"
            , style "cursor" "pointer"
            , onClick Increment
            ]
            [ text "+" ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox { init = init, update = update, view = view }
