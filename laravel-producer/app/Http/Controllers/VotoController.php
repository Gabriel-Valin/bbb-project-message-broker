<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostVoto;
use Illuminate\Http\Response;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class VotoController extends Controller
{
    public function postVoto(PostVoto $request) {
        $connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
        $channel = $connection->channel();

        $channel->exchange_declare('votes', 'direct');
        $channel->queue_declare('create_votes_queue', false, true, false, false);
        $channel->queue_bind('create_votes_queue', 'votes', 'create_votes');

        $dataJson = [
            'idEmparedadoRecebido' => $request->input('emparedadoId'),
            'numeroParedaoRecebido' => $request->input('numeroParedao')
        ];
        $messageVote = new AMQPMessage(strval(json_encode($dataJson)));
        $channel->basic_publish($messageVote, 'votes', 'create_votes');
        
        $channel->close();
        $connection->close();

        return response()->json([
            'successMessage' => 'Obrigado por votar!'
        ], Response::HTTP_OK);

    }
}
