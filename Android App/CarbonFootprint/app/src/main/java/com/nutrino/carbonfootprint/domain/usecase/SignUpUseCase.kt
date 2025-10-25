package com.nutrino.carbonfootprint.domain.usecase

import com.nutrino.carbonfootprint.data.remote.auth.SignUpRequest
import com.nutrino.carbonfootprint.data.remote.auth.SignUpResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.AuthRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class SignUpUseCase @Inject constructor(
    private val authRepository: AuthRepository
) {
    suspend operator fun invoke(signUpRequest: SignUpRequest): Flow<ResultState<SignUpResponse>> {
        return authRepository.signUp(signUpRequest = signUpRequest)
    }
}