package com.nutrino.carbonfootprint.presentation.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nutrino.carbonfootprint.data.remote.ingestion.IngestEventsRequest
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.usecase.IngestEventsUseCase
import com.nutrino.carbonfootprint.presentation.state.IngestEventsUIState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class IngestionViewmodel @Inject constructor(
    private val ingestEventsUseCase: IngestEventsUseCase
) : ViewModel() {
    private val _ingestEventsState = MutableStateFlow<IngestEventsUIState>(IngestEventsUIState.Idle)
    val ingestEventsState = _ingestEventsState.asStateFlow()

    val dispatcher = Dispatchers.IO

    fun ingestEvents(ingestEventsRequest: IngestEventsRequest){
        viewModelScope.launch(dispatcher){
            ingestEventsUseCase.invoke(ingestEventsRequest = ingestEventsRequest).collect {result->
                when(result){
                    is ResultState.Loading->{
                        _ingestEventsState.value = IngestEventsUIState.Loading
                    }
                    is ResultState.Success->{
                        _ingestEventsState.value = IngestEventsUIState.Success(data = result.data)
                    }
                    is ResultState.Error->{
                        _ingestEventsState.value = IngestEventsUIState.Error(error = result.message.toString())
                    }
                }
            }
        }
    }
}
