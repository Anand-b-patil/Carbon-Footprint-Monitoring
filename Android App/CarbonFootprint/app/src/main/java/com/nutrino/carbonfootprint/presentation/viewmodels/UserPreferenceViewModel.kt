package com.nutrino.carbonfootprint.presentation.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class UserPreferenceViewModel @Inject constructor(
    private val userPrefrence: UserPrefrence
) : ViewModel() {

    private val _isInitialized = MutableStateFlow(false)
    val isInitialized = _isInitialized.asStateFlow()

    // --- StateFlow for exposing access token to UI ---
    private val _accessToken = MutableStateFlow<String?>(null)
    val accessToken = _accessToken.asStateFlow()

    // --- StateFlow for checking if user is logged in ---
    private val _isLoggedIn = MutableStateFlow(false)
    val isLoggedIn = _isLoggedIn.asStateFlow()

    init {
        viewModelScope.launch {
            // Wait for access token to emit its first value
            userPrefrence.accessToken.first()
            _isInitialized.value = true
        }

        // Start observing access token
        observeAccessToken()
    }

    // --- Collect access token flow ---
    private fun observeAccessToken() {
        viewModelScope.launch {
            userPrefrence.accessToken.collect { token ->
                _accessToken.value = token
                _isLoggedIn.value = !token.isNullOrEmpty()
            }
        }
    }

    // --- Update access token ---
    fun updateAccessToken(newToken: String) {
        viewModelScope.launch(Dispatchers.IO) {
            userPrefrence.updateAccessToken(newToken)
        }
    }

    // --- Clear all data ---
    fun clearAllData() {
        viewModelScope.launch(Dispatchers.IO) {
            userPrefrence.clearToken()
        }
    }
}
