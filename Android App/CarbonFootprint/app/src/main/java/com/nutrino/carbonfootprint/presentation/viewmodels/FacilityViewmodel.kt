package com.nutrino.carbonfootprint.presentation.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nutrino.carbonfootprint.data.remote.facilities.CreateFacilityRequest
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.usecase.CreateFacilityUseCase
import com.nutrino.carbonfootprint.domain.usecase.GetFacilitiesUseCase
import com.nutrino.carbonfootprint.presentation.state.CreateFacilityUIState
import com.nutrino.carbonfootprint.presentation.state.FacilitiesUIState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class FacilityViewmodel @Inject constructor(
    private val getFacilitiesUseCase: GetFacilitiesUseCase,
    private val createFacilityUseCase: CreateFacilityUseCase
) : ViewModel() {
    private val _facilitiesState = MutableStateFlow<FacilitiesUIState>(FacilitiesUIState.Idle)
    val facilitiesState = _facilitiesState.asStateFlow()

    private val _createFacilityState = MutableStateFlow<CreateFacilityUIState>(CreateFacilityUIState.Idle)
    val createFacilityState = _createFacilityState.asStateFlow()

    val dispatcher = Dispatchers.IO

    fun getFacilities(){
        viewModelScope.launch(dispatcher){
            getFacilitiesUseCase.invoke().collect {result->
                when(result){
                    is ResultState.Loading->{
                        _facilitiesState.value = FacilitiesUIState.Loading
                    }
                    is ResultState.Success->{
                        _facilitiesState.value = FacilitiesUIState.Success(data = result.data)
                    }
                    is ResultState.Error->{
                        _facilitiesState.value = FacilitiesUIState.Error(error = result.message.toString())
                    }
                }
            }
        }
    }

    fun createFacility(createFacilityRequest: CreateFacilityRequest){
        viewModelScope.launch(dispatcher){
            createFacilityUseCase.invoke(createFacilityRequest = createFacilityRequest).collect {result->
                when(result){
                    is ResultState.Loading->{
                        _createFacilityState.value = CreateFacilityUIState.Loading
                    }
                    is ResultState.Success->{
                        _createFacilityState.value = CreateFacilityUIState.Success(data = result.data)
                    }
                    is ResultState.Error->{
                        _createFacilityState.value = CreateFacilityUIState.Error(error = result.message.toString())
                    }
                }
            }
        }
    }
}
