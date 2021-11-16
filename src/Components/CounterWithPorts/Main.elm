port module Components.CounterWithPorts.Main exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)


type alias Model =
    Int


init : Int -> ( Model, Cmd Msg )
init initialValue =
    ( initialValue, Cmd.none )


port sendCount : Int -> Cmd msg


port receiveCount : (Int -> msg) -> Sub msg


type Msg
    = Increment
    | Decrement
    | Set Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            ( model + 1, sendCount (model + 1) )

        Decrement ->
            ( model - 1, sendCount (model - 1) )

        Set value ->
            ( value, Cmd.none )


view : Model -> Html Msg
view model =
    div
        [ style "display" "flex"
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


subscriptions : Int -> Sub Msg
subscriptions _ =
    receiveCount Set


main : Program Int Model Msg
main =
    Browser.element { init = init, update = update, view = view, subscriptions = subscriptions }
