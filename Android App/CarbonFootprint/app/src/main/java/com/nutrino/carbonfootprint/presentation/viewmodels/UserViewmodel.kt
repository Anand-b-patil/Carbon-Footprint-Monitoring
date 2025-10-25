package com.nutrino.carbonfootprint.presentation.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.usecase.GetMeUseCase
import com.nutrino.carbonfootprint.presentation.state.MeUIState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class UserViewmodel @Inject constructor(
    private val getMeUseCase: GetMeUseCase
) : ViewModel() {
    private val _meState = MutableStateFlow<MeUIState>(MeUIState.Idle)
    val meState = _meState.asStateFlow()

    val dispatcher = Dispatchers.IO

    fun getMe(){
        viewModelScope.launch(dispatcher){
            getMeUseCase.invoke().collect {result->
                when(result){
                    is ResultState.Loading->{
                        _meState.value = MeUIState.Loading
                    }
                    is ResultState.Success->{
                        _meState.value = MeUIState.Success(data = result.data)
                    }
                    is ResultState.Error->{
                        _meState.value = MeUIState.Error(error = result.message.toString())
                    }
                }
            }
        }
    }
}
