module Components.Examples.Crud.Main exposing (main)

import Browser
import Html exposing (Html, button, div, input, text)
import Html.Attributes exposing (disabled, name, style, type_, value)
import Html.Events exposing (onClick, onInput)


type alias Model =
    { nextId : Int
    , todos : List Todo
    , newTodo : Maybe String
    }


type alias Todo =
    { id : Int
    , title : String
    , completed : Bool
    }


init : Model
init =
    { nextId = 1
    , todos = []
    , newTodo = Nothing
    }


type Msg
    = InputTodo String
    | AddTodo
    | ToggleTodo Int
    | RemoveTodo Int


update : Msg -> Model -> Model
update msg model =
    case msg of
        InputTodo text ->
            { model
                | newTodo =
                    case String.length text of
                        0 ->
                            Nothing

                        _ ->
                            Just text
            }

        AddTodo ->
            case model.newTodo of
                Nothing ->
                    model

                Just text ->
                    { model
                        | todos = Todo model.nextId text False :: model.todos
                        , nextId = model.nextId + 1
                        , newTodo = Nothing
                    }

        ToggleTodo id ->
            { model
                | todos =
                    List.map
                        (\todo ->
                            if todo.id == id then
                                todo

                            else
                                { todo | completed = not todo.completed }
                        )
                        model.todos
            }

        RemoveTodo id ->
            { model
                | todos =
                    List.filter
                        (\todo -> todo.id /= id)
                        model.todos
            }


view : Model -> Html Msg
view model =
    div [ style "width" "300px", style "margin" "auto" ]
        [ input
            [ value
                (Maybe.withDefault "" model.newTodo)
            , onInput InputTodo
            ]
            []
        , button
            [ disabled (model.newTodo == Nothing), onClick AddTodo ]
            [ text "Add Todo" ]
        , div [ style "padding-top" "20px" ]
            (List.map
                (\todo ->
                    div
                        [ style "display" "flex"
                        , style "justify-content" "space-between"
                        , style "padding" "5px 0"
                        ]
                        [ input
                            [ type_ "checkbox"
                            , name (String.fromInt todo.id)
                            , onClick (ToggleTodo todo.id)
                            ]
                            []
                        , text todo.title
                        , button [ onClick (RemoveTodo todo.id) ] [ text "X" ]
                        ]
                )
                model.todos
            )
        ]


main : Program () Model Msg
main =
    Browser.sandbox { init = init, update = update, view = view }
