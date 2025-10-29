package com.nutrino.carbonfootprint.domain.repository

import com.nutrino.carbonfootprint.data.remote.factors.CreateFactorRequest
import com.nutrino.carbonfootprint.data.remote.factors.FactorResponse
import com.nutrino.carbonfootprint.data.remote.factors.PreviewFactorResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import kotlinx.coroutines.flow.Flow

interface FactorsRepository {
    suspend fun createFactor(factorRequest: CreateFactorRequest): Flow<ResultState<FactorResponse>>

    suspend fun getFactors(
        category: String? = null,
        geography: String? = null,
        validOn: String? = null
    ): Flow<ResultState<List<FactorResponse>>>

    suspend fun previewFactor(
        category: String,
        occurredAt: String,
        geography: String
    ): Flow<ResultState<PreviewFactorResponse>>
}
