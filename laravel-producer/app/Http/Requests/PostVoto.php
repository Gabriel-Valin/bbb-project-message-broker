<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostVoto extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'emparedadoId' => 'required|integer',
            'numeroParedao' => 'required|integer'
        ];
    }

    public function messages() {
        return [
            'emparedadoId.required' => 'O identificador do emparedado e obrigatorio.',
            'numeroParedao.required' => 'O identificador do paredao e obrigatorio.'
        ];
    }
}
