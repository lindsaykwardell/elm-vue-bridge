module Components.Examples.Http.Main exposing (main)

import Browser
import Html exposing (Html, button, div, input, text)
import Html.Attributes exposing (disabled, value)
import Html.Events exposing (onClick, onInput)
import Http
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as Decode
import Json.Encode as Encode


type alias Model =
    { input : String
    , status : Status
    , response : Maybe Todo
    }


type alias Todo =
    { id : Int
    , title : String
    , completed : Bool
    }


decodeTodo : Decoder Todo
decodeTodo =
    Decode.succeed Todo
        |> Decode.required "id" Decode.int
        |> Decode.required "title" Decode.string
        |> Decode.required "completed" Decode.bool


encodeTodo : Todo -> Encode.Value
encodeTodo todo =
    Encode.object
        [ ( "id", Encode.int todo.id )
        , ( "title", Encode.string todo.title )
        , ( "completed", Encode.bool todo.completed )
        ]


type Msg
    = InputText String
    | SubmitTodo
    | GotResponse (Result Http.Error Todo)



-- | GotPosts (Result Http.Error (List Post))


type Status
    = Idle
    | Running
    | Success
    | Failure


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }


init : ( Model, Cmd Msg )
init =
    ( { input = ""
      , status = Idle
      , response = Nothing
      }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        InputText input ->
            ( { model | input = input }, Cmd.none )

        SubmitTodo ->
            ( { model | status = Running }, submitTodo model.input )

        GotResponse (Result.Ok todo) ->
            ( { model | status = Success, response = Just todo }
            , Cmd.none
            )

        GotResponse (Result.Err _) ->
            ( { model | status = Failure }
            , Cmd.none
            )


view : Model -> Html Msg
view model =
    div []
        [ input [ value model.input, onInput <| InputText ] []
        , button
            [ disabled <| model.status == Running
            , onClick SubmitTodo
            ]
            [ text <| submitButtonText model.status ]
        , div []
            [ case model.response of
                Nothing ->
                    text <| "No response yet"

                Just todo ->
                    encodeTodo todo |> Encode.encode 4 |> text
            ]
        ]


submitButtonText : Status -> String
submitButtonText status =
    case status of
        Idle ->
            "Add Todo"

        Running ->
            "Adding..."

        Success ->
            "Added!"

        Failure ->
            "Failed!"


submitTodo : String -> Cmd Msg
submitTodo input =
    Http.post
        { url = "https://jsonplaceholder.typicode.com/todos"
        , body =
            Http.jsonBody
                (Encode.object
                    [ ( "title", Encode.string input )
                    , ( "completed", Encode.bool False )
                    ]
                )
        , expect = Http.expectJson GotResponse decodeTodo
        }
