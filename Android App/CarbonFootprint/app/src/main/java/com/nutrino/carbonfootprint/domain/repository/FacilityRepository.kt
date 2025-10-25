package com.nutrino.carbonfootprint.domain.repository

import com.nutrino.carbonfootprint.data.remote.facilities.CreateFacilityRequest
import com.nutrino.carbonfootprint.data.remote.facilities.FacilityResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import kotlinx.coroutines.flow.Flow

interface FacilityRepository {
    suspend fun getFacilities(): Flow<ResultState<List<FacilityResponse>>>
    suspend fun createFacility(createFacilityRequest: CreateFacilityRequest): Flow<ResultState<FacilityResponse>>
}
