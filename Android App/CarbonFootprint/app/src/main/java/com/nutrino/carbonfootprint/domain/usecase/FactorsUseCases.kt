package com.nutrino.carbonfootprint.domain.usecase

import com.nutrino.carbonfootprint.data.remote.factors.CreateFactorRequest
import com.nutrino.carbonfootprint.data.remote.factors.FactorResponse
import com.nutrino.carbonfootprint.data.remote.factors.PreviewFactorResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.FactorsRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class CreateFactorUseCase @Inject constructor(
    private val factorsRepository: FactorsRepository
) {
    suspend operator fun invoke(factorRequest: CreateFactorRequest): Flow<ResultState<FactorResponse>> {
        return factorsRepository.createFactor(factorRequest)
    }
}

class GetFactorsUseCase @Inject constructor(
    private val factorsRepository: FactorsRepository
) {
    suspend operator fun invoke(
        category: String? = null,
        geography: String? = null,
        validOn: String? = null
    ): Flow<ResultState<List<FactorResponse>>> {
        return factorsRepository.getFactors(category, geography, validOn)
    }
}

class PreviewFactorUseCase @Inject constructor(
    private val factorsRepository: FactorsRepository
) {
    suspend operator fun invoke(
        category: String,
        occurredAt: String,
        geography: String
    ): Flow<ResultState<PreviewFactorResponse>> {
        return factorsRepository.previewFactor(category, occurredAt, geography)
    }
}
