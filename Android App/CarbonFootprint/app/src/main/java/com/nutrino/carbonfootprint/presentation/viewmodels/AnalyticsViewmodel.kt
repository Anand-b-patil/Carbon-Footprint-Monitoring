package com.nutrino.carbonfootprint.presentation.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.usecase.GetKpisUseCase
import com.nutrino.carbonfootprint.domain.usecase.GetSummaryUseCase
import com.nutrino.carbonfootprint.presentation.state.KpisUIState
import com.nutrino.carbonfootprint.presentation.state.SummaryUIState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AnalyticsViewmodel @Inject constructor(
    private val getKpisUseCase: GetKpisUseCase,
    private val getSummaryUseCase: GetSummaryUseCase
) : ViewModel() {
    private val _kpisState = MutableStateFlow<KpisUIState>(KpisUIState.Idle)
    val kpisState = _kpisState.asStateFlow()

    private val _summaryState = MutableStateFlow<SummaryUIState>(SummaryUIState.Idle)
    val summaryState = _summaryState.asStateFlow()

    val dispatcher = Dispatchers.IO

    fun getKpis(from: String, to: String){
        viewModelScope.launch(dispatcher){
            getKpisUseCase.invoke(from = from, to = to).collect {result->
                when(result){
                    is ResultState.Loading->{
                        _kpisState.value = KpisUIState.Loading
                    }
                    is ResultState.Success->{
                        _kpisState.value = KpisUIState.Success(data = result.data)
                    }
                    is ResultState.Error->{
                        _kpisState.value = KpisUIState.Error(error = result.message.toString())
                    }
                }
            }
        }
    }

    fun getSummary(){
        viewModelScope.launch(dispatcher){
            getSummaryUseCase.invoke().collect {result->
                when(result){
                    is ResultState.Loading->{
                        _summaryState.value = SummaryUIState.Loading
                    }
                    is ResultState.Success->{
                        _summaryState.value = SummaryUIState.Success(data = result.data)
                    }
                    is ResultState.Error->{
                        _summaryState.value = SummaryUIState.Error(error = result.message.toString())
                    }
                }
            }
        }
    }
}
