package com.nutrino.carbonfootprint.data.local

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.intPreferencesKey
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject

private val Context.dataStore by preferencesDataStore("user_session_store")
class UserPrefrence @Inject constructor(private val context: Context){
    
    private val user_id = intPreferencesKey("user_id")
    private val user_email = stringPreferencesKey("user_email")
    private val user_role = stringPreferencesKey("user_role")
    private val session_token = stringPreferencesKey("session_token") // For session management
    private val is_logged_in = stringPreferencesKey("is_logged_in")

    val userId: Flow<Int?> = context.dataStore.data.map {
        it[user_id]
    }

    val userEmail: Flow<String?> = context.dataStore.data.map {
        it[user_email]
    }

    val userRole: Flow<String?> = context.dataStore.data.map {
        it[user_role]
    }

    val sessionToken: Flow<String?> = context.dataStore.data.map {
        it[session_token]
    }

    val isLoggedIn: Flow<Boolean> = context.dataStore.data.map {
        it[is_logged_in] == "true"
    }

    // Legacy support for existing code
    val acessToken: Flow<String?> = sessionToken

    suspend fun updateUserSession(userId: Int, email: String = "", role: String = "", token: String = "") {
        context.dataStore.edit {
            it[user_id] = userId
            it[user_email] = email
            it[user_role] = role
            it[session_token] = token
            it[is_logged_in] = "true"
        }
    }

    suspend fun updateAcessToken(token: String) {
        context.dataStore.edit {
            it[session_token] = token
        }
    }
    
    suspend fun clearSession() {
        context.dataStore.edit {
            it.clear()
        }
    }

    // Legacy support
    suspend fun clearToken() {
        clearSession()
    }

    // Add missing methods for API integration
    fun getBaseUrl(): String {
        return "http://localhost:5000" // Default base URL, can be configurable
    }

    fun getToken(): String? {
        var token: String? = null
        // Use runBlocking to get synchronous access to the token
        kotlinx.coroutines.runBlocking {
            context.dataStore.data.collect { preferences ->
                token = preferences[session_token]
                return@collect
            }
        }
        return token
    }
}