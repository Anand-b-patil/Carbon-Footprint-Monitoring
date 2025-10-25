package com.nutrino.carbonfootprint.presentation.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nutrino.carbonfootprint.data.remote.auth.SignInRequest
import com.nutrino.carbonfootprint.data.remote.auth.SignUpRequest
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.usecase.SignInUseCase
import com.nutrino.carbonfootprint.domain.usecase.SignUpUseCase
import com.nutrino.carbonfootprint.presentation.state.SignInUIState
import com.nutrino.carbonfootprint.presentation.state.SignUpUIState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AuthViewmodel @Inject constructor(
    private val signUpUseCase: SignUpUseCase,
    private val signInUseCase: SignInUseCase
) : ViewModel() {
    private val _signUpState = MutableStateFlow<SignUpUIState>(SignUpUIState.Idle)
    val signUpState = _signUpState.asStateFlow()

    private val _signInState = MutableStateFlow<SignInUIState>(SignInUIState.Idle)
    val signInState = _signInState.asStateFlow()

    val dispatcher = Dispatchers.IO

    fun signUp(signUpRequest: SignUpRequest){
        viewModelScope.launch(dispatcher){
            signUpUseCase.invoke(signUpRequest = signUpRequest).collect {result->
                when(result){
                    is ResultState.Loading->{
                        _signUpState.value = SignUpUIState.Loading
                    }
                    is ResultState.Success->{
                        _signUpState.value = SignUpUIState.Success(data = result.data)
                    }
                    is ResultState.Error->{
                        _signUpState.value = SignUpUIState.Error(error = result.message.toString())
                    }
                }
            }
        }
    }

    fun signIn(signInRequest: SignInRequest){
        viewModelScope.launch(dispatcher){
            signInUseCase.invoke(signInRequest = signInRequest).collect {result->
                when(result){
                    is ResultState.Loading->{
                        _signInState.value = SignInUIState.Loading
                    }
                    is ResultState.Success->{
                        _signInState.value = SignInUIState.Success(data = result.data)
                    }
                    is ResultState.Error->{
                        _signInState.value = SignInUIState.Error(error = result.message.toString())
                    }
                }
            }
        }
    }
}